import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { AuthUser } from '../jwt.strategy';

/**
 * Decorador @CurrentUser() — Lab 3 versión (lee request.user seteado por JwtStrategy).
 *
 * Passport inyecta el resultado de JwtStrategy.validate() en request.user
 * antes de que el handler se ejecute. Este decorador simplemente lo extrae.
 *
 * Uso en el controlador:
 *   @Get('profile')
 *   profile(@CurrentUser() user: AuthUser) {
 *     return user; // { id, email, role }
 *   }
 *
 * Diferencia con la versión de Lab 2: esa lee el header 'x-user-id' (simulación).
 * Esta lee el objeto real que inyecta Passport tras validar el JWT.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest<Request & { user: AuthUser }>();
    return request.user;
  },
);
