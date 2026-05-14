import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from './logging.interceptor';
import { TransformInterceptor } from './transform.interceptor';
import { TimeoutInterceptor } from './timeout.interceptor';

@ApiTags('Lab 2 – Patrones')
@Controller('lab2/interceptors')
export class InterceptorsController {
  @Get('logging')
  @UseInterceptors(LoggingInterceptor)
  @ApiOperation({ summary: 'LoggingInterceptor: logs HTTP method + URL + execution time to console' })
  @ApiResponse({ status: 200 })
  logging() {
    return { data: { message: 'Check the server console for the timing log', timestamp: new Date().toISOString() } };
  }

  @Get('transform')
  @UseInterceptors(TransformInterceptor)
  @ApiOperation({ summary: 'TransformInterceptor: wraps any response in { data, timestamp, success: true }' })
  @ApiResponse({ status: 200 })
  transform() {
    return { user: 'Ana', role: 'admin' };
  }

  @Get('timeout')
  @UseInterceptors(TimeoutInterceptor)
  @ApiOperation({ summary: 'TimeoutInterceptor: 5s limit — this endpoint sleeps 2s to prove it does not time out' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 408, description: 'Request timed out (only if sleep > 5s)' })
  async timeoutDemo() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { data: { message: 'Completed within the 5s timeout window', sleepMs: 2000 } };
  }
}
