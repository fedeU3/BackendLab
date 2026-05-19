import { ConflictException, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthUser } from './jwt.strategy';

// Tipo de usuario seguro: sin password ni relaciones lazy.
type SafeUser = Omit<User, 'password' | 'posts'>;

/**
 * Servicio de autenticación — maneja registro, login y seed de usuarios.
 *
 * OnModuleInit: el método onModuleInit() se llama automáticamente cuando
 * el módulo termina de inicializarse. Lo usamos para crear los usuarios
 * semilla si no existen, garantizando que Swagger sea usable sin setup.
 */
@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Se ejecuta una vez al arrancar la app. Idempotente: no crea duplicados.
  async onModuleInit(): Promise<void> {
    await this.seedUsers();
  }

  private async seedUsers(): Promise<void> {
    const seeds: { email: string; password: string; role: 'user' | 'admin' }[] = [
      { email: 'admin@lab3.com', password: 'admin123', role: 'admin' },
      { email: 'user@lab3.com', password: 'user123', role: 'user' },
    ];
    for (const seed of seeds) {
      const exists = await this.usersRepo.findOne({ where: { email: seed.email } });
      if (!exists) {
        // bcrypt.hash con 10 rounds es el estándar recomendado (balanceo seguridad/velocidad).
        const hashed = await bcrypt.hash(seed.password, 10);
        await this.usersRepo.save({ email: seed.email, password: hashed, role: seed.role });
      }
    }
  }

  async register(dto: CreateUserDto): Promise<SafeUser> {
    const exists = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepo.save({ email: dto.email, password: hashed, role: dto.role ?? 'user' });

    // Destructuring para excluir password y posts antes de retornar.
    const { password: _p, posts: _posts, ...result } = user;
    return result;
  }

  async login(dto: LoginDto): Promise<{ access_token: string; user: SafeUser & Pick<AuthUser, 'id'> }> {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });

    // Usamos el mismo mensaje para email inválido y password inválido.
    // Mensajes diferentes permitirían enumerar usuarios registrados (user enumeration attack).
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    // El payload del JWT incluye sub (user id), email y role.
    // JwtStrategy.validate() los extrae cuando llega un request con este token.
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    const { password: _p, posts: _posts, ...userInfo } = user;
    return { access_token, user: userInfo };
  }
}
