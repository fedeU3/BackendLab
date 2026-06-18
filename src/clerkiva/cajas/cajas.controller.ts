import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CajasService } from './cajas.service';
import {
  AperturaCajaDto,
  CierreCajaDto,
  CreateMovimientoDto,
} from './dto/create-movimiento.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/role.enum';

@ApiTags('Clerkiva – Cajas')
@ApiBearerAuth()
@Controller('clerkiva/cajas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CajasController {
  constructor(private readonly cajasService: CajasService) {}

  @Post('apertura')
  @Roles(Role.CAJERO, Role.ADMIN)
  @ApiOperation({
    summary: 'Abrir sesión de caja',
    description: 'Registra el saldo inicial. Solo puede haber una sesión abierta a la vez.',
  })
  apertura(@Body() dto: AperturaCajaDto) {
    return this.cajasService.apertura(dto);
  }

  @Post('movimiento')
  @Roles(Role.CAJERO, Role.ADMIN)
  @ApiOperation({
    summary: 'Registrar movimiento',
    description: 'Ingreso o egreso de efectivo en la sesión activa.',
  })
  movimiento(@Body() dto: CreateMovimientoDto) {
    return this.cajasService.registrarMovimiento(dto);
  }

  @Post('cierre')
  @Roles(Role.CAJERO, Role.ADMIN)
  @ApiOperation({
    summary: 'Cerrar sesión de caja',
    description:
      'Calcula la diferencia entre el saldo esperado (inicial + ingresos - egresos) y el saldo físico contado.',
  })
  cierre(@Body() dto: CierreCajaDto) {
    return this.cajasService.cierre(dto);
  }

  @Get('sesion-activa')
  @Roles(Role.CAJERO, Role.CONSULTA, Role.ADMIN)
  @ApiOperation({ summary: 'Ver sesión activa' })
  sesionActiva() {
    return this.cajasService.getSesionActiva();
  }
}
