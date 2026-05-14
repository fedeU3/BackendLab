import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { mkdirSync } from 'fs';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './lab2/exceptions/http-exception.filter';

/**
 * Punto de entrada de la aplicación NestJS.
 *
 * Configuraciones globales aplicadas aquí afectan a TODOS los módulos y rutas.
 * El orden importa: los pipes y filtros se aplican en el orden en que se registran.
 */
async function bootstrap(): Promise<void> {
  // NestExpressApplication expone useStaticAssets() — específico del adaptador Express.
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS habilitado para desarrollo local (permitir requests desde el browser/Swagger).
  app.enableCors();

  /**
   * ValidationPipe global — procesa class-validator en todos los endpoints.
   *
   * whitelist: true          → remueve campos no declarados en el DTO (evita inyección de campos extra).
   * forbidNonWhitelisted: true → lanza 400 si llegan campos no declarados (más estricto que solo remover).
   * transform: true          → class-transformer convierte tipos (ej: string "42" → number 42).
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Filtro de excepciones global — estandariza el formato de TODOS los errores HTTP.
  // Ver: src/lab2/exceptions/http-exception.filter.ts
  app.useGlobalFilters(new HttpExceptionFilter());

  // Crea la carpeta /uploads/ si no existe — necesaria para el endpoint de upload de Lab 3.
  const uploadsPath = join(process.cwd(), 'uploads');
  mkdirSync(uploadsPath, { recursive: true });

  // Sirve los archivos de /uploads/ como estáticos en la URL /uploads/:filename.
  app.useStaticAssets(uploadsPath, { prefix: '/uploads' });

  /**
   * Swagger UI — accesible en http://localhost:3000/api
   *
   * addBearerAuth() agrega el botón "Authorize" en Swagger para pegar el JWT.
   * @ApiBearerAuth() en los controllers de Lab 3 indica que usan esa auth.
   * persistAuthorization: true → el token se guarda entre recargas de Swagger.
   */
  const config = new DocumentBuilder()
    .setTitle('Backend Lab')
    .setDescription(
      [
        '## Backend Lab — NestJS Educational Demo',
        '',
        '**Lab 1 – Fundamentos**: Products CRUD (in-memory), Params, Query, Body, Headers, HttpCode.',
        '**Lab 2 – Patrones**: Pipes, Guards, Interceptors, Exception Filters, Custom Decorators, Middleware.',
        '**Lab 3 – Integraciones**: JWT Auth (SQLite/TypeORM), Posts CRUD, File Upload, EventEmitter.',
        '',
        '### Quick Start para Lab 3',
        '1. `POST /lab3/auth/login` con `{ "email": "admin@lab3.com", "password": "admin123" }`',
        '2. Copiá el `access_token` → hacé click en **Authorize** → pegalo como Bearer token',
        '3. Todos los endpoints de `/lab3/posts` están disponibles',
      ].join('\n'),
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(3000);
  console.log('\n Backend Lab corriendo en http://localhost:3000');
  console.log(' Swagger UI:           http://localhost:3000/api\n');
}

bootstrap();
