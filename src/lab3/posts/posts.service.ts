import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthUser } from '../auth/jwt.strategy';

/**
 * Servicio de Posts — demuestra el patrón Repository de TypeORM.
 *
 * @InjectRepository(Post) inyecta el repositorio de TypeORM para la entidad Post.
 * El repositorio expone métodos como find(), findOne(), save(), remove()
 * que generan las queries SQL automáticamente.
 *
 * EventEmitter2 se usa para emitir eventos de dominio cuando ocurren acciones
 * importantes (ej: post creado). Los listeners reaccionan desacoplados del servicio.
 */
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepo: Repository<Post>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // findAndCount retorna [resultados, total] en una sola query — útil para paginación.
  async findPublished(page: number, limit: number): Promise<{ posts: Post[]; total: number; page: number; limit: number }> {
    const [posts, total] = await this.postsRepo.findAndCount({
      where: { published: true },
      relations: ['author'], // hace JOIN con la tabla users para cargar el autor
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { posts, total, page, limit };
  }

  async findMine(user: AuthUser): Promise<Post[]> {
    // Sin filtro de published — el autor ve todos sus posts (borradores incluidos).
    return this.postsRepo.find({ where: { authorId: user.id }, order: { createdAt: 'DESC' } });
  }

  async findOne(id: number, user?: AuthUser): Promise<Post> {
    const post = await this.postsRepo.findOne({ where: { id }, relations: ['author'] });
    if (!post) throw new NotFoundException(`Post ${id} not found`);

    // Si el post no está publicado, solo el autor o un admin pueden verlo.
    // Retornamos 404 (no 403) para no revelar que el post existe.
    if (!post.published && (!user || (user.id !== post.authorId && user.role !== 'admin'))) {
      throw new NotFoundException(`Post ${id} not found`);
    }
    return post;
  }

  async create(dto: CreatePostDto, user: AuthUser): Promise<Post> {
    // Los posts nacen como borradores (published: false). Se publican con PUT /:id/publish.
    const post = await this.postsRepo.save({ ...dto, authorId: user.id, published: false });

    // Emitimos el evento para que los listeners reaccionen (logging, notificaciones, etc.).
    this.eventEmitter.emit('post.created', { postId: post.id, title: post.title, authorId: user.id });
    return post;
  }

  async update(id: number, dto: UpdatePostDto, user: AuthUser): Promise<Post> {
    const post = await this.postsRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException(`Post ${id} not found`);
    this.assertOwnerOrAdmin(post, user);
    Object.assign(post, dto);
    return this.postsRepo.save(post);
  }

  async togglePublish(id: number, user: AuthUser): Promise<Post> {
    const post = await this.postsRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException(`Post ${id} not found`);
    this.assertOwnerOrAdmin(post, user);
    post.published = !post.published; // toggle: true → false, false → true
    return this.postsRepo.save(post);
  }

  async remove(id: number, user: AuthUser): Promise<{ id: number }> {
    const post = await this.postsRepo.findOne({ where: { id } });
    if (!post) throw new NotFoundException(`Post ${id} not found`);
    this.assertOwnerOrAdmin(post, user);

    // TypeORM borra el id del objeto al hacer remove(), por eso lo retornamos antes.
    await this.postsRepo.remove(post);
    return { id };
  }

  // Verificación de permisos centralizada — reutilizable por update, publish y remove.
  private assertOwnerOrAdmin(post: Post, user: AuthUser): void {
    if (user.id !== post.authorId && user.role !== 'admin') {
      throw new ForbiddenException('Solo el autor o un admin pueden realizar esta acción');
    }
  }
}
