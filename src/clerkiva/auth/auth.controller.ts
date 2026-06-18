import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserEntity } from './entities/user.entity';

@ApiTags('Clerkiva – Auth')
@Controller('clerkiva/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description:
      'Igual que Clerkiva real: userID + password → JWT con {id, rol}.\n\n' +
      'Usuarios disponibles:\n' +
      '- admin / admin123 (ADMIN)\n' +
      '- cajero01 / cajero123 (CAJERO)\n' +
      '- consulta / consulta123 (CONSULTA)\n' +
      '- deposito / deposito123 (DEPOSITO)',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Usuario actual',
    description:
      'Devuelve el usuario del token. Notá que **password** y **token** NO aparecen en la respuesta ' +
      'gracias a @Exclude() en UserEntity.\n\n' +
      'En Clerkiva real, el endpoint /auth devuelve el usuario SIN @Exclude — el password viaja en la respuesta.',
  })
  me(@CurrentUser() user: UserEntity) {
    return user;
  }
}
