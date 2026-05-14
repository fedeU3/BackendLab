import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from './api-key.guard';
import { RolesGuard } from './roles.guard';

@ApiTags('Lab 2 – Patrones')
@Controller('lab2/guards')
export class GuardsController {
  @Get('public')
  @ApiOperation({ summary: 'Public endpoint — no guard applied' })
  @ApiResponse({ status: 200 })
  public() {
    return { data: { message: 'Public endpoint — always accessible', timestamp: new Date().toISOString() } };
  }

  @Get('protected')
  @UseGuards(ApiKeyGuard)
  @ApiOperation({ summary: 'ApiKeyGuard: reads x-api-key header, valid only if "lab2-secret"' })
  @ApiHeader({ name: 'x-api-key', description: 'Must be: lab2-secret', required: true })
  @ApiResponse({ status: 200, description: 'Access granted' })
  @ApiResponse({ status: 401, description: 'Invalid or missing API key' })
  protected() {
    return { data: { message: 'Access granted', timestamp: new Date().toISOString() } };
  }

  @Get('protected-roles')
  @UseGuards(ApiKeyGuard, RolesGuard)
  @SetMetadata('roles', ['admin'])
  @ApiOperation({ summary: 'ApiKeyGuard + RolesGuard: requires x-api-key AND x-user-role: admin' })
  @ApiHeader({ name: 'x-api-key', description: 'Must be: lab2-secret', required: true })
  @ApiHeader({ name: 'x-user-role', description: 'Must be: admin', required: true })
  @ApiResponse({ status: 200, description: 'Admin access granted' })
  @ApiResponse({ status: 401, description: 'Missing API key' })
  @ApiResponse({ status: 403, description: 'Insufficient role' })
  protectedRoles() {
    return { data: { message: 'Admin access granted', timestamp: new Date().toISOString() } };
  }
}
