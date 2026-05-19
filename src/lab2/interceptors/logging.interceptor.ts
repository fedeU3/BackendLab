import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

/**
 * Interceptor de logging — implementa NestInterceptor.
 *
 * Un Interceptor envuelve el handler con lógica pre y post ejecución.
 * Similar a un middleware pero con acceso al resultado del handler via RxJS.
 *
 * Flujo: request → Middleware → Guard → Pipe → [Interceptor PRE] → Handler → [Interceptor POST] → response
 *
 * intercept() retorna un Observable: next.handle() dispara el handler y emite su resultado.
 * tap() ejecuta un side-effect (el log) sin modificar el valor emitido.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;
    const start = Date.now();

    return next.handle().pipe(
      // tap se ejecuta DESPUÉS de que el handler retorna su valor.
      tap(() => {
        const elapsed = Date.now() - start;
        this.logger.log(`${method} ${url} — ${elapsed}ms`);
      }),
    );
  }
}
