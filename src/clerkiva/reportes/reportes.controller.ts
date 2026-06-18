import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportesService } from './reportes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/role.enum';

@ApiTags('Clerkiva – Reportes')
@ApiBearerAuth()
@Controller('clerkiva/reportes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('empleado-top')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Empleado con más ventas',
    description:
      'Mismo patrón que Clerkiva real: agrupa ventas por usuario y suma totales. ' +
      'Aquí en memoria, en producción sería QueryBuilder + groupBy + SUM.\n\n' +
      'Requiere rol ADMIN. CAJERO y CONSULTA reciben 403.',
  })
  empleadoTop() {
    return this.reportesService.empleadoConMasVentas();
  }

  @Get('resumen-diario')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Resumen del día',
    description: 'Total de ventas hoy, cantidad, desglose por medio de pago.',
  })
  resumenDiario() {
    return this.reportesService.resumenDiario();
  }
}
