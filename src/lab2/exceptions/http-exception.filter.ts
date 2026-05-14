import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Filtro de excepciones HTTP global — implementa ExceptionFilter.
 *
 * NestJS tiene un filtro de excepciones global por defecto, pero su formato
 * no siempre es consistente. Este filtro normaliza TODAS las HttpException
 * en una estructura predecible: { statusCode, message, error, timestamp, path }.
 *
 * @Catch(HttpException) indica que solo atrapa ese tipo (y sus subclases como
 * NotFoundException, ForbiddenException, etc.).
 *
 * Aplicado globalmente en main.ts con app.useGlobalFilters(new HttpExceptionFilter()).
 * También puede aplicarse a nivel de controlador con @UseFilters().
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // getResponse() puede retornar string o un objeto con { message, error, statusCode }.
    const exceptionResponse = exception.getResponse();
    const message =
      typeof exceptionResponse === 'object' && exceptionResponse !== null && 'message' in exceptionResponse
        ? (exceptionResponse as { message: string | string[] }).message
        : exception.message;

    // Estructura de error estandarizada para toda la API.
    response.status(status).json({
      statusCode: status,
      message,
      error: exception.name,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
