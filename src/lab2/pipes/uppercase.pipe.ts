import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

/**
 * Pipe personalizado — implementa la interfaz PipeTransform<I, O>.
 *
 * Un Pipe en NestJS transforma o valida el valor de un parámetro entrante
 * antes de que llegue al handler del controlador.
 *
 * Flujo: request → Guard → Pipe → Handler → Interceptor → response
 *
 * @Injectable() permite inyectarlo en el DI container, aunque en este caso
 * se usa directamente como clase: @Param('value', CustomUppercasePipe).
 */
@Injectable()
export class CustomUppercasePipe implements PipeTransform<string, string> {
  // value: el dato que viene del request. metadata: info sobre el parámetro (tipo, nombre).
  transform(value: string, _metadata: ArgumentMetadata): string {
    // Verificamos el tipo para no romper si por algún motivo no llega un string.
    return typeof value === 'string' ? value.toUpperCase() : value;
  }
}
