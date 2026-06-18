import { Module } from '@nestjs/common';
import { AuthSeguraController } from './throttle/auth-segura.controller';
import { RealtimeController } from './realtime/realtime.controller';
import { RealtimeService } from './realtime/realtime.service';
import { TareasController } from './tareas/tareas.controller';
import { TareasService } from './tareas/tareas.service';
import { SaludController } from './salud/salud.controller';

@Module({
  controllers: [
    AuthSeguraController,
    RealtimeController,
    TareasController,
    SaludController,
  ],
  providers: [RealtimeService, TareasService],
})
export class LabClerkivaModule {}
