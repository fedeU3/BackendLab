import { SetMetadata } from '@nestjs/common';

/**
 * Decorador @Throttle(limit, ttl) — adjunta metadata de rate limiting.
 *
 * Este decorador NO implementa rate limiting real; solo guarda la configuración
 * como metadata en el handler. Un ThrottleGuard leería esa metadata para
 * aplicar la lógica real (típicamente con Redis o un Map en memoria).
 *
 * Ejemplo de uso:
 *   @Throttle(10, 60)   // máx 10 requests por 60 segundos
 *   @Get('endpoint')
 *   handler() { ... }
 *
 * Librería real de NestJS para esto: @nestjs/throttler.
 */
export const THROTTLE_KEY = 'throttle';
export const Throttle = (limit: number, ttl: number) => SetMetadata(THROTTLE_KEY, { limit, ttl });
