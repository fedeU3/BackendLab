import { SetMetadata } from '@nestjs/common';

/**
 * Decorador @Public() — marca una ruta como pública mediante metadata.
 *
 * SetMetadata(key, value) adjunta metadata al handler o clase.
 * Un Guard (ej: JwtAuthGuard) puede leer esa metadata con Reflector para
 * decidir si saltear la autenticación en esa ruta específica.
 *
 * Patrón habitual:
 *   @Public()
 *   @Get('health')
 *   health() { ... }
 *
 * Y en el Guard:
 *   const isPublic = reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [...]);
 *   if (isPublic) return true;
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
