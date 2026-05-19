import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateExceptionDto {
  @ApiProperty({ example: 'some value', description: 'Required string field — omit o dejar vacío para ver el error 400' })
  @IsString()
  @IsNotEmpty()
  requiredField!: string;
}
