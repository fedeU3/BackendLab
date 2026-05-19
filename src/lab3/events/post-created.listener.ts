import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventsService } from './events.service';

/**
 * Listener de eventos — reacciona a eventos emitidos por EventEmitter2.
 *
 * @OnEvent('nombre.evento') registra el método como handler para ese evento.
 * Se puede usar wildcard: @OnEvent('post.*') atraparía 'post.created', 'post.deleted', etc.
 *
 * Los listeners son desacoplados del emisor: PostsService no sabe que este listener existe.
 * Esto sigue el patrón Observer / Event-Driven Architecture.
 *
 * EventEmitter2 es síncrono por defecto en @nestjs/event-emitter.
 * Para async, agregar { async: true } en @OnEvent o configurar asyncMode en EventEmitterModule.
 */
@Injectable()
export class PostCreatedListener {
  private readonly logger = new Logger(PostCreatedListener.name);

  constructor(private readonly eventsService: EventsService) {}

  @OnEvent('post.created')
  handlePostCreated(payload: unknown): void {
    this.logger.log(`[Event] post.created → ${JSON.stringify(payload)}`);
    this.eventsService.addToLog('post.created', payload);
  }

  @OnEvent('file.uploaded')
  handleFileUploaded(payload: unknown): void {
    this.logger.log(`[Event] file.uploaded → ${JSON.stringify(payload)}`);
    this.eventsService.addToLog('file.uploaded', payload);
  }

  // Wildcard catch-all — captura cualquier evento no manejado explícitamente.
  @OnEvent('*')
  handleAny(_payload: unknown): void {
    // Solo debug — en producción esto podría loguear a un sistema de telemetría.
    this.logger.debug(`[Event] wildcard catch-all disparado`);
  }
}
