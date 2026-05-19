import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface TransformResponse<T> {
  data: T;
  timestamp: string;
  success: true;
}

/**
 * Interceptor de transformación — envuelve CUALQUIER respuesta exitosa en un envelope estándar.
 *
 * map() transforma el valor emitido por el handler antes de enviarlo al cliente.
 * Diferencia clave con tap(): map() MODIFICA el valor, tap() solo hace side-effects.
 *
 * Aplicado con @UseInterceptors(TransformInterceptor) a nivel de controlador
 * o handler, o globalmente con app.useGlobalInterceptors() en main.ts.
 *
 * Resultado: cualquier { ... } que retorne el handler se convierte en:
 *   { data: { ... }, timestamp: "...", success: true }
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, TransformResponse<T>> {
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<TransformResponse<T>> {
    return next.handle().pipe(
      map(data => ({
        data,
        timestamp: new Date().toISOString(),
        success: true as const,
      })),
    );
  }
}
