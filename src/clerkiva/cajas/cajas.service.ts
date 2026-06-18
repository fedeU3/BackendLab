import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  AperturaCajaDto,
  CierreCajaDto,
  CreateMovimientoDto,
  TipoMovimiento,
} from './dto/create-movimiento.dto';

export interface MovimientoCaja {
  id: number;
  tipo: TipoMovimiento;
  monto: number;
  descripcion: string;
  timestamp: Date;
}

export interface SesionCaja {
  id: number;
  abiertaEn: Date;
  saldoInicial: number;
  movimientos: MovimientoCaja[];
  cerradaEn?: Date;
  saldoFinal?: number;
  diferencia?: number;
  abierta: boolean;
}

@Injectable()
export class CajasService {
  private sesiones: SesionCaja[] = [];
  private nextSesionId = 1;
  private nextMovId = 1;

  apertura(dto: AperturaCajaDto): SesionCaja {
    const abierta = this.sesiones.find((s) => s.abierta);
    if (abierta) throw new BadRequestException('Ya hay una sesión de caja abierta');

    const sesion: SesionCaja = {
      id: this.nextSesionId++,
      abiertaEn: new Date(),
      saldoInicial: dto.saldoInicial,
      movimientos: [],
      abierta: true,
    };
    this.sesiones.push(sesion);
    return sesion;
  }

  registrarMovimiento(dto: CreateMovimientoDto): SesionCaja {
    const sesion = this.sesiones.find((s) => s.abierta);
    if (!sesion) throw new BadRequestException('No hay sesión de caja abierta');

    sesion.movimientos.push({
      id: this.nextMovId++,
      tipo: dto.tipo,
      monto: dto.monto,
      descripcion: dto.descripcion,
      timestamp: new Date(),
    });
    return sesion;
  }

  cierre(dto: CierreCajaDto): SesionCaja {
    const sesion = this.sesiones.find((s) => s.abierta);
    if (!sesion) throw new BadRequestException('No hay sesión de caja abierta');

    const ingresos = sesion.movimientos
      .filter((m) => m.tipo === TipoMovimiento.INGRESO)
      .reduce((sum, m) => sum + m.monto, 0);

    const egresos = sesion.movimientos
      .filter((m) => m.tipo === TipoMovimiento.EGRESO)
      .reduce((sum, m) => sum + m.monto, 0);

    const saldoEsperado = sesion.saldoInicial + ingresos - egresos;

    sesion.saldoFinal = dto.saldoFinal;
    sesion.diferencia = dto.saldoFinal - saldoEsperado;
    sesion.cerradaEn = new Date();
    sesion.abierta = false;

    return sesion;
  }

  getSesionActiva(): SesionCaja {
    const sesion = this.sesiones.find((s) => s.abierta);
    if (!sesion) throw new NotFoundException('No hay sesión de caja abierta');
    return sesion;
  }
}
