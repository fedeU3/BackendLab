import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

export class TriggerEventDto {
  @ApiProperty({ example: 'custom.event' })
  @IsString()
  event!: string;

  @ApiProperty({ example: { key: 'value', info: 'demo' } })
  @IsObject()
  payload!: Record<string, unknown>;
}
