import { Controller, Get } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from './current-user.decorator';
import { Public } from './public.decorator';
import { Throttle } from './throttle.decorator';

@ApiTags('Lab 2 – Patrones')
@Controller('lab2/decorators')
export class DecoratorsController {
  @Get('user')
  @ApiOperation({ summary: '@CurrentUser() param decorator — extracts x-user-id header into a method param' })
  @ApiHeader({ name: 'x-user-id', description: 'Simulated user ID', required: false })
  @ApiResponse({ status: 200 })
  user(@CurrentUser() userId: string) {
    return {
      data: {
        userId: userId ?? null,
        message: userId ? `Hello, user ${userId}` : 'No x-user-id header provided',
      },
    };
  }

  @Get('public')
  @Public()
  @ApiOperation({ summary: '@Public() metadata decorator — marks the route as public (metadata only in this demo)' })
  @ApiResponse({ status: 200 })
  publicRoute() {
    return { data: { message: 'Route marked as public via @Public() — a guard would read this metadata to skip auth' } };
  }

  @Get('throttled')
  @Throttle(10, 60)
  @ApiOperation({ summary: '@Throttle(10, 60) metadata decorator — stores limit/ttl metadata on the handler' })
  @ApiResponse({ status: 200 })
  throttled() {
    return {
      data: {
        message: 'Route decorated with @Throttle(10, 60)',
        note: 'A ThrottleGuard could read this metadata to enforce rate limiting',
      },
    };
  }
}
