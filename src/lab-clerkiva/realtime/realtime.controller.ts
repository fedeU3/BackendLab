import {
  Body,
  Controller,
  MessageEvent,
  Post,
  Sse,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Observable } from 'rxjs';
import { RealtimeService } from './realtime.service';
import { MedioDePago } from '../../clerkiva/ventas/dto/create-venta.dto';

class NuevaVentaDto {
  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsNumber()
  @Min(0.01)
  total: number;

  @IsEnum(MedioDePago)
  medioDePago: MedioDePago;
}

@ApiTags('Lab Clerkiva – SSE Tiempo Real')
@Controller('lab-clerkiva/caja')
export class RealtimeController {
  constructor(private readonly realtimeService: RealtimeService) {}

  @Sse('eventos')
  @ApiOperation({
    summary: 'Stream SSE de ventas en tiempo real',
    description:
      '## Server-Sent Events — sin WebSockets, sin configuración extra\n\n' +
      'Abrí esta URL en el browser o con `curl -N http://localhost:3000/lab-clerkiva/caja/eventos`.\n\n' +
      'Luego hacé un POST a `/lab-clerkiva/caja/venta` y vas a ver el evento aparecer ' +
      'instantáneamente en el stream abierto.\n\n' +
      '**¿Para qué sirve en Clerkiva?**\n' +
      '- La caja 2 ve en tiempo real las ventas de la caja 1 sin recargar la página\n' +
      '- El gerente en otra pantalla ve las ventas del día acumularse en vivo\n' +
      '- Dashboard de ventas por turno actualizado en tiempo real\n\n' +
      '> SSE es HTTP puro: funciona con cualquier proxy/CDN, soporta reconexión automática del browser.',
  })
  stream(): Observable<MessageEvent> {
    return this.realtimeService.getStream();
  }

  @Post('venta')
  @ApiOperation({
    summary: 'Registrar venta y emitir evento SSE',
    description:
      'Registra una venta y la emite a **todos los clientes conectados al stream /eventos** en tiempo real.\n\n' +
      'Abrí primero el endpoint `GET /lab-clerkiva/caja/eventos` en otra pestaña, ' +
      'luego mandá un POST acá y verás el evento aparecer instantáneamente.',
  })
  registrarVenta(@Body() dto: NuevaVentaDto) {
    const evento = this.realtimeService.emitirVenta(dto);
    return {
      data: evento,
      message: 'Evento emitido — revisá el stream en GET /lab-clerkiva/caja/eventos',
    };
  }
}
