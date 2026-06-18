import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

export interface EventoVenta {
  id: number;
  usuario: string;
  total: number;
  medioDePago: string;
  timestamp: string;
}

@Injectable()
export class RealtimeService {
  private readonly subject = new Subject<MessageEvent>();
  private contador = 1;

  getStream(): Observable<MessageEvent> {
    return this.subject.asObservable();
  }

  emitirVenta(data: Omit<EventoVenta, 'id' | 'timestamp'>): EventoVenta {
    const evento: EventoVenta = {
      id: this.contador++,
      ...data,
      timestamp: new Date().toISOString(),
    };
    this.subject.next({ data: evento } as MessageEvent);
    return evento;
  }
}
