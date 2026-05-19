import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

/**
 * Guard de roles — combina Guards con metadata de decoradores.
 *
 * Patrón habitual en NestJS:
 *   1. Un decorador como @SetMetadata('roles', ['admin']) adjunta metadata al handler.
 *   2. El Guard usa Reflector para leer esa metadata en runtime.
 *   3. Compara la metadata con los datos del request (aquí: el header x-user-role).
 *
 * Reflector es un helper de @nestjs/core que lee la metadata registrada
 * con @SetMetadata() en handlers o clases.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  // Reflector se inyecta automáticamente — está disponible en cualquier módulo.
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Lee la metadata 'roles' del handler decorado con @SetMetadata('roles', [...]).
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // Si el handler no tiene metadata de roles, la ruta es pública para este guard.
    if (!roles || roles.length === 0) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const userRole = request.headers['x-user-role'] as string | undefined;

    if (!userRole || !roles.includes(userRole)) {
      throw new ForbiddenException(`Requiere rol: ${roles.join(', ')}. Enviá el header x-user-role.`);
    }
    return true;
  }
}
