import { Body, Controller, Get, Header, Headers, HttpCode, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryDto } from '../products/dto/query.dto';
import { DemoBodyDto } from '../products/dto/demo-body.dto';

/**
 * Controlador de demos — muestra patrones de extracción de datos del request.
 *
 * Cada endpoint demuestra un decorador diferente de NestJS para acceder
 * a distintas partes del request HTTP (params, query, body, headers).
 */
@ApiTags('Lab 1 – Fundamentos')
@Controller('lab1/demo')
export class DemoController {
  /**
   * @Param('id', ParseIntPipe): extrae ':id' del path y lo convierte a number.
   * Sin ParseIntPipe, llegaría como string "42". Con él, llega como número 42.
   * Si el valor no es parseable como entero, NestJS responde 400 automáticamente.
   */
  @Get('params/:id')
  @ApiOperation({ summary: '@Param + ParseIntPipe: recibe string, valida que sea entero' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Value is not a valid integer' })
  demoParams(@Param('id', ParseIntPipe) id: number) {
    return { data: { id, type: typeof id, note: 'ParseIntPipe coercionó el string del path a number' } };
  }

  /**
   * @Query() con un DTO tipado: con transform: true en ValidationPipe,
   * class-transformer convierte los strings de la URL ("?page=2") a los tipos
   * declarados en QueryDto (number). Sin @Type(() => Number) en el DTO, fallaría.
   */
  @Get('query')
  @ApiOperation({ summary: '@Query tipado con DTO: page, limit, sort con transformación automática' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, type: String })
  @ApiResponse({ status: 200 })
  demoQuery(@Query() query: QueryDto) {
    return { data: query };
  }

  /**
   * @Body() con objeto anidado: class-validator necesita @ValidateNested() + @Type()
   * en el DTO hijo para inspeccionar las propiedades del sub-objeto.
   */
  @Post('body')
  @ApiOperation({ summary: '@Body con objeto anidado y validación recursiva' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, description: 'Validation error' })
  demoBody(@Body() body: DemoBodyDto) {
    return { data: body, message: 'Body recibido y validado correctamente' };
  }

  /**
   * @Headers('authorization') inyecta el valor del header específico como parámetro.
   * También existe @Headers() sin nombre para recibir todos los headers como objeto.
   */
  @Get('headers')
  @ApiOperation({ summary: '@Headers: lee el header Authorization del request' })
  @ApiResponse({ status: 200 })
  demoHeaders(@Headers('authorization') authorization: string) {
    return {
      data: {
        authorization: authorization ?? null,
        note: 'Leído con @Headers("authorization") — también podés usar @Headers() para todos',
      },
    };
  }

  /**
   * @HttpCode(202): cambia el status code por defecto (200 en GET, 201 en POST).
   * @Header('X-Custom', 'value'): agrega un header estático a la respuesta.
   * Verificá el header X-Custom en la pestaña "Response headers" de Swagger.
   */
  @Get('status')
  @HttpCode(202)
  @Header('X-Custom', 'value')
  @ApiOperation({ summary: '@HttpCode(202) + @Header: status code y header custom en la respuesta' })
  @ApiResponse({ status: 202, description: 'Accepted — revisá el header X-Custom en la respuesta' })
  demoStatus() {
    return { data: { statusCode: 202, note: 'Revisá el header X-Custom en "Response headers" de Swagger' } };
  }
}
