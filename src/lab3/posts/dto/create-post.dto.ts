import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'My First Post' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  title!: string;

  @ApiProperty({ example: 'This is the content of my post. It can be as long as needed.' })
  @IsString()
  @IsNotEmpty()
  content!: string;
}
