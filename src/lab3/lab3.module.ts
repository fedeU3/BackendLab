import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { User } from './auth/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { FilesController } from './files/files.controller';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { PostCreatedListener } from './events/post-created.listener';

/**
 * Módulo Lab 3 — agrupa toda la configuración de integraciones.
 *
 * TypeOrmModule.forRoot(): configura la conexión SQLite (better-sqlite3).
 *   - database: 'lab3.sqlite' crea el archivo en la raíz del proyecto.
 *   - synchronize: true auto-crea/altera tablas según las entidades (solo desarrollo).
 *   - entities: lista explícita de entidades para evitar problemas con globs en Windows.
 *
 * TypeOrmModule.forFeature([User, Post]): registra los repositorios de esas entidades
 *   para que puedan inyectarse con @InjectRepository() en los servicios del módulo.
 *
 * PassportModule.register({ defaultStrategy: 'jwt' }): configura Passport con JWT
 *   como estrategia default (necesario para que AuthGuard('jwt') funcione).
 *
 * JwtModule.register(): configura la firma y expiración de los tokens.
 *
 * EventEmitterModule.forRoot(): inicializa EventEmitter2 como módulo global.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'lab3.sqlite',
      synchronize: true,
      entities: [User, Post],
    }),
    TypeOrmModule.forFeature([User, Post]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: 'lab3-secret', signOptions: { expiresIn: '1h' } }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AuthController, PostsController, FilesController, EventsController],
  providers: [AuthService, JwtStrategy, PostsService, EventsService, PostCreatedListener],
})
export class Lab3Module {}
