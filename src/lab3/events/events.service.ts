import { Injectable } from '@nestjs/common';

export interface EventLogEntry {
  event: string;
  payload: unknown;
  timestamp: string;
}

/**
 * Servicio de log de eventos — almacena en memoria los eventos emitidos.
 *
 * Es un singleton dentro del módulo (alcance por defecto de @Injectable).
 * Tanto PostCreatedListener como EventsController comparten la misma instancia,
 * por eso el log es consistente entre los dos.
 *
 * En producción este log estaría en una base de datos o sistema de observabilidad.
 */
@Injectable()
export class EventsService {
  private readonly log: EventLogEntry[] = [];

  addToLog(event: string, payload: unknown): void {
    this.log.push({ event, payload, timestamp: new Date().toISOString() });
  }

  // Retornamos una copia del array para evitar mutaciones externas.
  getLog(): EventLogEntry[] {
    return [...this.log];
  }
}
