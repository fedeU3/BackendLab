import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, Min, MinLength } from 'class-validator';

/**
 * DTO (Data Transfer Object) para crear un producto.
 *
 * class-validator lee los decoradores en runtime y valida el body entrante.
 * ValidationPipe (global en main.ts) rechaza el request con 400 si algo falla.
 * @ApiProperty expone cada campo en Swagger con tipo, descripción y ejemplo.
 *
 * El `!` (definite assignment assertion) le dice a TypeScript que el valor será
 * asignado por class-transformer antes de usarse, aunque no haya constructor.
 */
export class CreateProductDto {
  // @IsString → debe ser string. @MinLength/@MaxLength → largo mínimo/máximo.
  @ApiProperty({ example: 'Laptop Pro 15', minLength: 2, maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name!: string;

  // @IsNumber acepta enteros y decimales. @IsPositive rechaza 0 y negativos.
  @ApiProperty({ example: 999.99 })
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({ example: 'Electronics' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  // @IsInt rechaza decimales (diferente a @IsNumber). @Min(0) permite stock = 0.
  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(0)
  stock!: number;
}
