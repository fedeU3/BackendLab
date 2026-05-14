import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { Observable, TimeoutError, catchError, throwError, timeout } from 'rxjs';

/**
 * Interceptor de timeout — corta el request si tarda más de 5 segundos.
 *
 * timeout(ms) de RxJS lanza un TimeoutError si el Observable no emite
 * dentro del tiempo dado. catchError intercepta ese error y lo convierte
 * en una excepción HTTP que NestJS puede formatear correctamente (408).
 *
 * Sin este interceptor, un handler que no responde bloquearía el thread
 * indefinidamente (o hasta el timeout del SO/proxy).
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(5000), // lanza TimeoutError si el handler tarda > 5s
      catchError(err => {
        if (err instanceof TimeoutError) {
          // Convertimos el TimeoutError de RxJS en una excepción HTTP 408.
          return throwError(() => new RequestTimeoutException('Request timed out after 5 seconds'));
        }
        // Re-lanzamos cualquier otro error sin modificarlo.
        return throwError(() => err);
      }),
    );
  }
}
