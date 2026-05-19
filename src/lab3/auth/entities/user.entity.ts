import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entidad TypeORM → se mapea a la tabla 'users' en SQLite.
 *
 * Con synchronize: true en la config, TypeORM crea/altera la tabla
 * automáticamente al iniciar la app (solo para desarrollo).
 * El `!` en cada propiedad es necesario porque TypeORM las asigna en runtime,
 * no en el constructor de la clase.
 */
@Entity('users')
export class User {
  // AUTO_INCREMENT en SQLite — TypeORM lo maneja automáticamente.
  @PrimaryGeneratedColumn()
  id!: number;

  // unique: true genera un UNIQUE INDEX en la tabla.
  @Column({ unique: true })
  email!: string;

  // Nunca se expone en respuestas — AuthService omite este campo con destructuring.
  @Column()
  password!: string;

  // default: 'user' → SQLite guarda 'user' si no se especifica rol.
  @Column({ default: 'user' })
  role!: 'user' | 'admin';

  // TypeORM setea automáticamente la fecha de creación al hacer INSERT.
  @CreateDateColumn()
  createdAt!: Date;

  // Lazy string para evitar import circular entre User y Post.
  @OneToMany('Post', 'author')
  posts!: unknown[];
}
