import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Lab 3 – Integraciones')
@Controller('lab3/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Seed users: admin@lab3.com / admin123, user@lab3.com / user123',
  })
  @ApiResponse({ status: 201, description: 'User registered, returns { id, email, role, createdAt }' })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  async register(@Body() dto: CreateUserDto) {
    return { data: await this.authService.register(dto), message: 'User registered successfully' };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and receive a JWT Bearer token' })
  @ApiResponse({ status: 201, description: 'Returns { access_token, user }' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto) {
    return { data: await this.authService.login(dto), message: 'Login successful' };
  }
}
