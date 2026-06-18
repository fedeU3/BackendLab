import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VentasService } from './ventas.service';
import { CreateVentaDto, GetVentasDto, MedioDePago } from './dto/create-venta.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '../auth/role.enum';
import { UserEntity } from '../auth/entities/user.entity';

@ApiTags('Clerkiva – Ventas')
@ApiBearerAuth()
@Controller('clerkiva/ventas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Get()
  @Roles(Role.CAJERO, Role.CONSULTA, Role.ADMIN)
  @ApiOperation({
    summary: 'Listar ventas',
    description: 'Acepta filtros opcionales: desde, hasta (ISO 8601), medioDePago.',
  })
  findAll(@Query() query: GetVentasDto) {
    return this.ventasService.findAll(
      query.desde,
      query.hasta,
      query.medioDePago as MedioDePago | undefined,
    );
  }

  @Post()
  @Roles(Role.CAJERO, Role.ADMIN)
  @ApiOperation({
    summary: 'Registrar venta',
    description:
      'Mismo patrón que Clerkiva real: calcula total de lineasVenta, guarda quién la registró.\n\n' +
      'CONSULTA y DEPOSITO reciben 403. Solo CAJERO y ADMIN pueden registrar ventas.',
  })
  create(@Body() dto: CreateVentaDto, @CurrentUser() user: UserEntity) {
    return this.ventasService.create(dto, user);
  }

  @Get(':id')
  @Roles(Role.CAJERO, Role.CONSULTA, Role.ADMIN)
  @ApiOperation({ summary: 'Detalle de venta por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.findOne(id);
  }
}
