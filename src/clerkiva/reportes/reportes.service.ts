import { Injectable } from '@nestjs/common';
import { VentasService } from '../ventas/ventas.service';

@Injectable()
export class ReportesService {
  constructor(private readonly ventasService: VentasService) {}

  empleadoConMasVentas() {
    const ventas = this.ventasService.getAll();
    if (ventas.length === 0) return { mensaje: 'Sin ventas registradas aún' };

    // Mismo patrón que Clerkiva real pero en memoria en vez de QueryBuilder + groupBy + SUM
    const porUsuario: Record<string, { usuario: string; cantVentas: number; totalVendido: number }> = {};

    for (const venta of ventas) {
      if (!porUsuario[venta.usuario]) {
        porUsuario[venta.usuario] = { usuario: venta.usuario, cantVentas: 0, totalVendido: 0 };
      }
      porUsuario[venta.usuario].cantVentas++;
      porUsuario[venta.usuario].totalVendido += venta.total;
    }

    const ranking = Object.values(porUsuario).sort(
      (a, b) => b.totalVendido - a.totalVendido,
    );

    return { ranking };
  }

  resumenDiario() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const ventasHoy = this.ventasService.getAll().filter((v) => v.fecha >= hoy);

    const totalVendido = ventasHoy.reduce((sum, v) => sum + v.total, 0);

    const porMedioDePago = ventasHoy.reduce<Record<string, number>>((acc, v) => {
      acc[v.medioDePago] = (acc[v.medioDePago] ?? 0) + v.total;
      return acc;
    }, {});

    return {
      fecha: hoy.toISOString().split('T')[0],
      cantidadVentas: ventasHoy.length,
      totalVendido,
      porMedioDePago,
    };
  }
}
