import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

/**
 * DTO para query params tipados.
 *
 * Con transform: true en ValidationPipe, @Query() puede recibir este DTO directamente
 * y class-transformer convierte los strings de la URL a los tipos correctos.
 * Sin @Type(() => Number), "?page=2" llegaría como string "2" y @IsInt fallaría.
 */
export class QueryDto {
  // @Type(() => Number) le dice a class-transformer que convierta el string a número.
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({ example: 'name' })
  @IsOptional()
  @IsString()
  sort?: string;
}
