import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export enum TipoMovimiento {
  INGRESO = 'ingreso',
  EGRESO = 'egreso',
}

export class AperturaCajaDto {
  @ApiProperty({ example: 5000, description: 'Saldo inicial en efectivo' })
  @IsNumber()
  @Min(0)
  saldoInicial: number;
}

export class CreateMovimientoDto {
  @ApiProperty({ enum: TipoMovimiento, example: TipoMovimiento.INGRESO })
  @IsEnum(TipoMovimiento)
  tipo: TipoMovimiento;

  @ApiProperty({ example: 2000 })
  @IsNumber()
  @Min(0.01)
  monto: number;

  @ApiProperty({ example: 'Venta en efectivo #12' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;
}

export class CierreCajaDto {
  @ApiProperty({ example: 8500, description: 'Monto físico contado al cierre' })
  @IsNumber()
  @Min(0)
  saldoFinal: number;
}
