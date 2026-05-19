import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

/**
 * Guard de API Key — implementa la interfaz CanActivate.
 *
 * Un Guard decide si el request puede continuar hacia el handler.
 * Se ejecuta DESPUÉS de los middlewares y ANTES de los pipes.
 *
 * Flujo: Middleware → Guard → Pipe → Handler → Interceptor
 *
 * canActivate devuelve true (pasa) o false / lanza excepción (bloquea).
 * También puede devolver Observable<boolean> o Promise<boolean>.
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // ExecutionContext da acceso al request HTTP, WebSocket, RPC, etc.
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    // Si la clave no es válida, lanzamos la excepción directamente.
    // NestJS la convierte en HTTP 401 Unauthorized.
    if (apiKey !== 'lab2-secret') {
      throw new UnauthorizedException('Invalid or missing API key — usa x-api-key: lab2-secret');
    }
    return true;
  }
}
