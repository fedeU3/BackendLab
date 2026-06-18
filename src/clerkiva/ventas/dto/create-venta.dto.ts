import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export enum MedioDePago {
  EFECTIVO = 'efectivo',
  TARJETA = 'tarjeta',
  TRANSFERENCIA = 'transferencia',
}

export class LineaVentaDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  productoId: number;

  @ApiProperty({ example: 'Yerba Mate 1kg' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  cantidad: number;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  @Min(0.01)
  precioUnitario: number;
}

export class GetVentasDto {
  @IsOptional()
  @IsString()
  desde?: string;

  @IsOptional()
  @IsString()
  hasta?: string;

  @IsOptional()
  @IsEnum(MedioDePago)
  medioDePago?: MedioDePago;
}

export class CreateVentaDto {
  @ApiProperty({ type: [LineaVentaDto] })
  @IsArray()
  @ArrayMinSize(1, { message: 'La venta debe tener al menos un producto' })
  @ValidateNested({ each: true })
  @Type(() => LineaVentaDto)
  lineasVenta: LineaVentaDto[];

  @ApiProperty({ enum: MedioDePago, example: MedioDePago.EFECTIVO })
  @IsEnum(MedioDePago)
  medioDePago: MedioDePago;
}
