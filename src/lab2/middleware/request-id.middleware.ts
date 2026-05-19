import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

/**
 * Middleware de Request ID — implementa NestMiddleware.
 *
 * Un Middleware en NestJS es equivalente a Express middleware: se ejecuta
 * ANTES de que el request llegue al Guard, Pipe e Handler.
 *
 * Diferencia con Interceptor:
 *   - Middleware: acceso al request/response crudos de Express.
 *   - Interceptor: acceso al contexto de ejecución de NestJS (handler, metadata).
 *
 * randomUUID() de Node.js crypto genera un UUID v4 criptográficamente seguro,
 * sin necesidad de instalar ningún paquete externo.
 *
 * Se aplica solo a las rutas de MiddlewareController (ver Lab2Module.configure()).
 */
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestIdMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const requestId = randomUUID();

    // Lo inyectamos en los headers del request para que el handler pueda leerlo.
    req.headers['x-request-id'] = requestId;

    // También lo enviamos en la respuesta para que el cliente lo correlacione.
    res.setHeader('X-Request-Id', requestId);

    this.logger.log(`[${req.method}] ${req.url} — X-Request-Id: ${requestId}`);

    // next() es obligatorio: sin él el request se queda bloqueado.
    next();
  }
}
