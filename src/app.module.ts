import { Module } from '@nestjs/common';
import { Lab1Module } from './lab1/lab1.module';
import { Lab2Module } from './lab2/lab2.module';
import { Lab3Module } from './lab3/lab3.module';

/**
 * Módulo raíz de la aplicación.
 *
 * NestJS arranca desde aquí: AppModule importa los 3 labs, que a su vez
 * registran sus propios controllers, providers y configuraciones de DI.
 *
 * No hay TypeOrmModule.forRoot() aquí porque Lab3Module lo configura internamente.
 * TypeOrmModule es global por defecto, así que los repositorios de Lab3 están
 * disponibles en ese módulo sin necesidad de exportarlos al root.
 */
@Module({
  imports: [Lab1Module, Lab2Module, Lab3Module],
})
export class AppModule {}
