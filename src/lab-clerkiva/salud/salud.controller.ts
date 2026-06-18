import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Lab Clerkiva – Health Check')
@Controller('lab-clerkiva/salud')
export class SaludController {
  @Get()
  @ApiOperation({
    summary: 'Health check del servidor',
    description:
      '## ¿Por qué Clerkiva necesita esto urgente?\n\n' +
      'Actualmente no hay forma de saber si el servidor está caído sin que alguien lo reporte. ' +
      'El primer síntoma es "no funciona la caja" a las 8am.\n\n' +
      '**Con este endpoint:**\n' +
      '- UptimeRobot (gratis) lo consulta cada 5 minutos y manda WhatsApp/email si cae\n' +
      '- El deploy en Railway/Render lo usa como liveness probe\n' +
      '- El frontend puede mostrar un badge de estado en tiempo real\n\n' +
      '**Versión avanzada:** `@nestjs/terminus` agrega checks de DB, Redis, disco, memoria.',
  })
  salud() {
    const uptime = process.uptime();
    const mem = process.memoryUsage();

    return {
      status: 'ok',
      uptime: {
        segundos: Math.floor(uptime),
        legible: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`,
      },
      memoria: {
        usada: `${Math.round(mem.heapUsed / 1024 / 1024)} MB`,
        total: `${Math.round(mem.heapTotal / 1024 / 1024)} MB`,
        porcentaje: `${Math.round((mem.heapUsed / mem.heapTotal) * 100)}%`,
      },
      proceso: {
        nodeVersion: process.version,
        pid: process.pid,
        plataforma: process.platform,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
