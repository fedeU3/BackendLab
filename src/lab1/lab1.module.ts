import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { DemoController } from './demo/demo.controller';

/**
 * Módulo Lab 1 — Fundamentos de NestJS.
 *
 * Un @Module() define un contexto de DI (Dependency Injection) aislado.
 * controllers[]: NestJS registra estas clases como manejadores de rutas HTTP.
 * providers[]: instancias que pueden inyectarse via constructor en este módulo.
 *
 * ProductsService está en providers[], por eso puede inyectarse en ProductsController
 * y DemoController simplemente declarándolo en el constructor.
 */
@Module({
  controllers: [ProductsController, DemoController],
  providers: [ProductsService],
})
export class Lab1Module {}
