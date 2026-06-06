import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

// TypeOrmModule.forRoot está en AppModule (conexión 'default').
// Aquí solo registramos los repositorios de User y Post para este módulo.
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') ?? 'fallback-lab3-secret',
        signOptions: { expiresIn: '1h' },
      }),
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AuthController, PostsController, FilesController, EventsController],
  providers: [AuthService, JwtStrategy, PostsService, EventsService, PostCreatedListener],
})
export class Lab3Module {}
