import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard JWT — extiende el guard genérico de Passport para la estrategia 'jwt'.
 *
 * AuthGuard('jwt') busca la estrategia registrada con ese nombre (JwtStrategy),
 * ejecuta el flujo de Passport (extraer token → validar → set request.user)
 * y retorna true/false.
 *
 * Al extender en una clase propia podemos:
 *   - Sobreescribir handleRequest() para personalizar errores.
 *   - Agregar lógica adicional (ej: leer metadata @Public() para rutas públicas).
 *   - Inyectar dependencias con el constructor de NestJS.
 *
 * Uso: @UseGuards(JwtAuthGuard) en el controlador o handler.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
