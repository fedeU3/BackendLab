import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';

import { VentasController } from './ventas/ventas.controller';
import { VentasService } from './ventas/ventas.service';

import { CajasController } from './cajas/cajas.controller';
import { CajasService } from './cajas/cajas.service';

import { ReportesController } from './reportes/reportes.controller';
import { ReportesService } from './reportes/reportes.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') ?? 'backendlab-dev-secret',
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  controllers: [
    AuthController,
    VentasController,
    CajasController,
    ReportesController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    VentasService,
    CajasService,
    ReportesService,
  ],
})
export class ClerkivaModule {}
