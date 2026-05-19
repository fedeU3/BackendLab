import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

/**
 * Decorador de parámetro personalizado — Lab 2 versión (lee header x-user-id).
 *
 * createParamDecorator() crea un decorador que se usa igual que @Param(), @Query() o @Body(),
 * pero con lógica de extracción personalizada.
 *
 * El primer argumento (data) es lo que se pasa al decorador: @CurrentUser('email').
 * En este caso no se usa, pero es útil para seleccionar qué campo del user devolver.
 *
 * Nota: Lab 3 tiene su propia versión de @CurrentUser() que lee request.user (JWT).
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();
    // En un sistema real, el user vendría de request.user (seteado por Passport/JWT).
    // Aquí lo simulamos leyendo directamente el header.
    return request.headers['x-user-id'] as string | undefined;
  },
);
