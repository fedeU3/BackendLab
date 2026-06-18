import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Agrega headers de seguridad HTTP en una línea:
  // X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, etc.
  app.use(helmet());

  // Comprime respuestas con gzip automáticamente.
  // Crítico para Clerkiva: los listados de productos (500+ items) pasan de 80KB a ~8KB.
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('BackendLab — Clerkiva Edition')
    .setDescription(
      [
        '## Clerkiva Backend Lab',
        '',
        '### Clerkiva (patrones de Clerkiva implementados correctamente)',
        '- `POST /clerkiva/auth/login` → JWT con userID + password (roles: ADMIN, CAJERO, CONSULTA, DEPOSITO)',
        '- `GET /clerkiva/auth/me` → usuario actual sin password (@Exclude en UserEntity)',
        '- `GET/POST /clerkiva/ventas` → CRUD con roles y validación de negocio',
        '- `POST /clerkiva/cajas/apertura|movimiento|cierre` → flujo completo de caja',
        '- `GET /clerkiva/reportes/empleado-top|resumen-diario` → solo ADMIN',
        '',
        '**Quick start:**',
        '1. `POST /clerkiva/auth/login` con `{ "userID": "admin", "password": "admin123" }`',
        '2. Copiá el token → **Authorize** → pegalo como Bearer',
        '3. Explorá el resto de endpoints',
        '',
        '### Lab Clerkiva (funciones que Clerkiva no tiene)',
        '- `POST /lab-clerkiva/auth/login` → rate limiting: 5 intentos/min, 6to recibe 429',
        '- `GET /lab-clerkiva/caja/eventos` → SSE stream en tiempo real',
        '- `POST /lab-clerkiva/caja/venta` → dispara evento al stream SSE',
        '- `GET /lab-clerkiva/tareas/log` → log de cron jobs ejecutados',
        '- `GET /lab-clerkiva/salud` → health check (uptime, memoria, node version)',
      ].join('\n'),
    )
    .setVersion('2.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(3000);
  console.log('\n BackendLab corriendo en http://localhost:3000');
  console.log(' Swagger UI:       http://localhost:3000/api\n');
}

bootstrap();
