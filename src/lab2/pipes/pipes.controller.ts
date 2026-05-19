import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomUppercasePipe } from './uppercase.pipe';
import { ValidatePipeDto } from './dto/validate-pipe.dto';

@ApiTags('Lab 2 – Patrones')
@Controller('lab2/pipes')
export class PipesController {
  @Get('parse-int/:value')
  @ApiOperation({ summary: 'ParseIntPipe: coerces string param to integer, rejects non-integers' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Value is not a valid integer' })
  parseInt(@Param('value', ParseIntPipe) value: number) {
    return { data: { value, type: typeof value } };
  }

  @Get('parse-uuid/:id')
  @ApiOperation({ summary: 'ParseUUIDPipe: validates that param is a valid UUID v4' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'Value is not a valid UUID' })
  parseUuid(@Param('id', ParseUUIDPipe) id: string) {
    return { data: { id, valid: true } };
  }

  @Get('custom/:value')
  @ApiOperation({ summary: 'CustomUppercasePipe: custom pipe that converts param to UPPERCASE' })
  @ApiResponse({ status: 200 })
  customPipe(@Param('value', CustomUppercasePipe) value: string) {
    return { data: { value, note: 'Transformed to UPPERCASE by CustomUppercasePipe' } };
  }

  @Post('validate')
  @ApiOperation({ summary: 'ValidationPipe via DTO: validates body fields and transforms types' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, description: 'Validation error' })
  validate(@Body() dto: ValidatePipeDto) {
    return { data: dto };
  }
}
