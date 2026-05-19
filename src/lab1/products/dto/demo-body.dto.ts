import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';

/**
 * DTO anidado para demostrar validación de objetos embebidos.
 *
 * class-validator por defecto NO valida objetos anidados.
 * Es necesario combinar @ValidateNested() + @Type(() => ClaseHija) para que
 * class-transformer instancie el sub-objeto y class-validator lo inspeccione.
 */
export class AddressDto {
  @ApiProperty({ example: '123 Main St' })
  @IsString()
  @IsNotEmpty()
  street!: string;

  @ApiProperty({ example: 'New York' })
  @IsString()
  @IsNotEmpty()
  city!: string;
}

export class DemoBodyDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 25 })
  @IsNumber()
  @IsPositive()
  age!: number;

  // Sin @ValidateNested() + @Type(), el objeto llegaría sin validar sus campos internos.
  @ApiProperty({ type: () => AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  address!: AddressDto;
}
