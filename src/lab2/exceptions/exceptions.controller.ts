import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from './http-exception.filter';
import { ValidateExceptionDto } from './dto/validate-exception.dto';

@ApiTags('Lab 2 – Patrones')
@Controller('lab2/exceptions')
@UseFilters(HttpExceptionFilter)
export class ExceptionsController {
  @Get('not-found')
  @ApiOperation({ summary: 'Throws NotFoundException → formatted by HttpExceptionFilter as { statusCode, message, error, timestamp, path }' })
  @ApiResponse({ status: 404 })
  notFound(): never {
    throw new NotFoundException('Recurso no encontrado');
  }

  @Get('forbidden')
  @ApiOperation({ summary: 'Throws ForbiddenException (403)' })
  @ApiResponse({ status: 403 })
  forbidden(): never {
    throw new ForbiddenException('Access denied to this resource');
  }

  @Get('custom')
  @ApiOperation({ summary: 'Throws HttpException with custom status 422 (Unprocessable Entity)' })
  @ApiResponse({ status: 422 })
  custom(): never {
    throw new HttpException('Unprocessable entity: business rule violated', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Post('validate')
  @ApiOperation({ summary: 'ValidationPipe 400: omit or leave requiredField empty to see the error format' })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400, description: 'Validation error' })
  validate(@Body() dto: ValidateExceptionDto) {
    return { data: dto };
  }
}
