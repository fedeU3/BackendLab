import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TareasService } from './tareas.service';

@ApiTags('Lab Clerkiva – Cron Jobs')
@Controller('lab-clerkiva/tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Get('log')
  @ApiOperation({
    summary: 'Log de tareas automáticas ejecutadas',
    description:
      '## Cron Jobs con @nestjs/schedule\n\n' +
      '**¿Por qué esto le cambia la vida a Clerkiva?**\n\n' +
      'Actualmente en Clerkiva:\n' +
      '- El resumen de ventas se genera manualmente\n' +
      '- Nadie sabe si hay productos bajo stock hasta que el cajero lo nota\n' +
      '- Los reportes los genera el gerente cuando recuerda hacerlo\n\n' +
      'Con @Cron():\n' +
      '- `@Cron("59 23 * * *")` → resumen automático a las 23:59, email al gerente\n' +
      '- `@Cron("0 * * * *")` → chequeo de stock cada hora, alerta si algo baja del mínimo\n' +
      '- `@Cron(CronExpression.EVERY_DAY_AT_6AM)` → backup diario\n\n' +
      'En este lab los crons corren cada 30s y 2min para que puedas verlos en acción. ' +
      'Esperá unos segundos y refrescá este endpoint.',
  })
  getLog() {
    return {
      data: this.tareasService.getLog(),
      nota: 'Chequeo stock: cada 30s (en prod: cada hora). Resumen diario: cada 2min (en prod: 23:59).',
    };
  }
}
