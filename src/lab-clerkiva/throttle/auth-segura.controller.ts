import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class LoginSeguroDto {
  @IsString()
  @IsNotEmpty()
  userID: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

@ApiTags('Lab Clerkiva – Rate Limiting')
@Controller('lab-clerkiva/auth')
@UseGuards(ThrottlerGuard)
export class AuthSeguraController {
  @Post('login')
  @HttpCode(401)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation({
    summary: 'Login con rate limiting',
    description:
      '## ¿Por qué esto importa para Clerkiva?\n\n' +
      'El login actual de Clerkiva **no tiene límite de intentos**. ' +
      'Un atacante puede probar contraseñas indefinidamente (ataque de fuerza bruta).\n\n' +
      '**Con @Throttle({ default: { limit: 5, ttl: 60000 } }):** el 6to intento en 60 segundos ' +
      'recibe automáticamente **429 Too Many Requests** — sin ningún código adicional.\n\n' +
      'Probalo: mandá 6 requests seguidos y observá el cambio.\n\n' +
      '> El ThrottlerModule trackea por IP. En producción podés combinarlo con Redis para ' +
      'tracking distribuido entre múltiples instancias.',
  })
  login(@Body() _dto: LoginSeguroDto) {
    // Siempre rechaza para que puedas probar el rate limiting fácilmente
    return { mensaje: 'Credenciales inválidas — intentá 5 veces más para ver el 429' };
  }
}
