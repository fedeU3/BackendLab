import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto, MedioDePago } from './dto/create-venta.dto';
import { UserEntity } from '../auth/entities/user.entity';

export interface LineaVenta {
  productoId: number;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Venta {
  id: number;
  fecha: Date;
  usuario: string;
  lineasVenta: LineaVenta[];
  medioDePago: MedioDePago;
  total: number;
}

@Injectable()
export class VentasService {
  private ventas: Venta[] = [];
  private nextId = 1;

  create(dto: CreateVentaDto, user: UserEntity): Venta {
    const lineasVenta: LineaVenta[] = dto.lineasVenta.map((l) => ({
      ...l,
      subtotal: l.cantidad * l.precioUnitario,
    }));

    const total = lineasVenta.reduce((sum, l) => sum + l.subtotal, 0);

    const venta: Venta = {
      id: this.nextId++,
      fecha: new Date(),
      usuario: user.usuario,
      lineasVenta,
      medioDePago: dto.medioDePago,
      total,
    };

    this.ventas.push(venta);

    // En Clerkiva real: si medioDePago === 'efectivo', aquí se crea un movimiento de caja
    // queryRunner.manager.save(MovimientoCaja, { monto: total, tipo: 'ingreso', ... })

    return venta;
  }

  findAll(desde?: string, hasta?: string, medioDePago?: MedioDePago): Venta[] {
    return this.ventas.filter((v) => {
      if (desde && v.fecha < new Date(desde)) return false;
      if (hasta && v.fecha > new Date(hasta)) return false;
      if (medioDePago && v.medioDePago !== medioDePago) return false;
      return true;
    });
  }

  findOne(id: number): Venta {
    const venta = this.ventas.find((v) => v.id === id);
    if (!venta) throw new NotFoundException(`Venta #${id} no encontrada`);
    return venta;
  }

  getAll(): Venta[] {
    return this.ventas;
  }
}
