import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PipesController } from './pipes/pipes.controller';
import { GuardsController } from './guards/guards.controller';
import { InterceptorsController } from './interceptors/interceptors.controller';
import { ExceptionsController } from './exceptions/exceptions.controller';
import { DecoratorsController } from './decorators/decorators.controller';
import { MiddlewareController } from './middleware/middleware.controller';
import { RequestIdMiddleware } from './middleware/request-id.middleware';
import { RolesGuard } from './guards/roles.guard';

/**
 * Módulo Lab 2 — Patrones Avanzados de NestJS.
 *
 * Implementa NestModule para poder configurar middlewares con configure().
 * A diferencia de Guards/Interceptors, los middlewares no tienen decoradores
 * por handler — se registran a nivel de módulo con forRoutes().
 *
 * forRoutes(MiddlewareController) aplica RequestIdMiddleware a TODAS las rutas
 * del controlador, equivalente a { path: 'lab2/middleware/*', method: ALL }.
 *
 * RolesGuard está en providers[] porque necesita inyección de Reflector.
 * Si se registrara como new RolesGuard() en @UseGuards(), no tendría DI.
 */
@Module({
  controllers: [
    PipesController,
    GuardsController,
    InterceptorsController,
    ExceptionsController,
    DecoratorsController,
    MiddlewareController,
  ],
  providers: [RolesGuard],
})
export class Lab2Module implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes(MiddlewareController);
  }
}
