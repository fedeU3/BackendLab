import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

/**
 * DTO para actualización parcial (PATCH).
 *
 * PartialType de @nestjs/swagger (no de @nestjs/mapped-types) convierte todos los campos
 * en opcionales Y hereda los decoradores @ApiProperty con required: false automáticamente.
 * class-validator también hereda los decoradores, así que si se envía `price` debe seguir
 * siendo un número positivo — solo que ya no es obligatorio enviarlo.
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
