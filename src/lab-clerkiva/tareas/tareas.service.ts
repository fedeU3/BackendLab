import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

export interface LogEntry {
  tarea: string;
  ejecutadaEn: string;
  resultado: string;
}

@Injectable()
export class TareasService {
  private readonly logger = new Logger(TareasService.name);
  private readonly log: LogEntry[] = [];

  // Cada 30 segundos en el lab para que puedas verlo ejecutar.
  // En Clerkiva real sería: @Cron('0 * * * *') → cada hora
  @Cron(CronExpression.EVERY_30_SECONDS)
  chequeoStockMinimo(): void {
    const productosBajoMinimo = Math.floor(Math.random() * 3); // Simula 0-2 productos
    const resultado =
      productosBajoMinimo === 0
        ? 'Todos los productos sobre el mínimo'
        : `${productosBajoMinimo} producto(s) bajo stock mínimo — se enviaría alerta`;

    this.registrar('Chequeo Stock Mínimo', resultado);
  }

  // Cada 2 minutos en el lab para que puedas verlo.
  // En Clerkiva real sería: @Cron('59 23 * * *') → 23:59 todos los días
  @Cron('*/2 * * * *')
  resumenDiarioAutomatico(): void {
    const ventasSimuladas = Math.floor(Math.random() * 50) + 10;
    const totalSimulado = (ventasSimuladas * 2500).toLocaleString('es-AR');

    this.registrar(
      'Resumen Diario Automático',
      `${ventasSimuladas} ventas — $${totalSimulado} vendidos. En producción: email al gerente.`,
    );
  }

  private registrar(tarea: string, resultado: string): void {
    const entry: LogEntry = {
      tarea,
      ejecutadaEn: new Date().toISOString(),
      resultado,
    };
    this.log.push(entry);
    this.logger.log(`[CRON] ${tarea}: ${resultado}`);
  }

  getLog(): LogEntry[] {
    return this.log.slice(-30);
  }
}
