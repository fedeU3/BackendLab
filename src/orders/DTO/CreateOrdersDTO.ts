import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsNumber()
  employeeId?: number;

  @IsOptional()
  @IsDateString()
  orderDate?: string;

  @IsOptional()
  @IsDateString()
  requiredDate?: string;

  @IsOptional()
  @IsNumber()
  shipVia?: number;

  @IsOptional()
  @IsNumber()
  freight?: number;

  @IsOptional()
  @IsString()
  shipName?: string;

  @IsOptional()
  @IsString()
  shipAddress?: string;

  @IsOptional()
  @IsString()
  shipCity?: string;

  @IsOptional()
  @IsString()
  shipRegion?: string;

  @IsOptional()
  @IsString()
  shipPostalCode?: string;

  @IsOptional()
  @IsString()
  shipCountry?: string;
}
