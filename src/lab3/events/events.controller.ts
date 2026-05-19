import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { TriggerEventDto } from './dto/trigger-event.dto';

@ApiTags('Lab 3 – Integraciones')
@Controller('lab3/events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post('trigger')
  @ApiOperation({
    summary: 'Manually emit an event — try post.created or file.uploaded to see listeners react',
  })
  @ApiResponse({ status: 201 })
  trigger(@Body() dto: TriggerEventDto) {
    this.eventEmitter.emit(dto.event, dto.payload);
    this.eventsService.addToLog(dto.event, dto.payload);
    return { data: { event: dto.event, payload: dto.payload }, message: 'Event emitted — check GET /lab3/events/log' };
  }

  @Get('log')
  @ApiOperation({ summary: 'In-memory log of all events received by listeners' })
  @ApiResponse({ status: 200 })
  log() {
    return { data: this.eventsService.getLog() };
  }
}
