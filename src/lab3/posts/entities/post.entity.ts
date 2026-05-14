import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

/**
 * Entidad Post con relación ManyToOne hacia User.
 *
 * @ManyToOne: muchos posts pueden pertenecer a un solo autor.
 * TypeORM crea automáticamente la columna FK `authorId` en la tabla.
 * La relación se puede cargar con { relations: ['author'] } en el find.
 */
@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  // 'text' en SQLite es un tipo sin límite de longitud (vs 'varchar').
  @Column('text')
  content!: string;

  // default: false → los posts nacen como borradores, se publican explícitamente.
  @Column({ default: false })
  published!: boolean;

  // Guardamos el FK como columna separada para poder filtrar sin hacer JOIN.
  @Column()
  authorId!: number;

  // La relación carga el objeto User completo cuando se incluye en relations[].
  @ManyToOne(() => User, user => user.posts)
  author!: User;

  // TypeORM setea en INSERT.
  @CreateDateColumn()
  createdAt!: Date;

  // TypeORM setea en INSERT y UPDATE.
  @UpdateDateColumn()
  updatedAt!: Date;
}
