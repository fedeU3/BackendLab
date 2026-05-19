import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class ValidatePipeDto {
  @ApiProperty({ example: 'Hello World' })
  @IsString()
  @IsNotEmpty()
  message!: string;

  @ApiProperty({ example: 3, minimum: 1 })
  @IsInt()
  @Min(1)
  count!: number;
}
