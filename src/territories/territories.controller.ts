import { Controller, Get } from '@nestjs/common';
import { TerritoriesService } from './territories.service';

@Controller('territories')
export class TerritoriesController {
  constructor(private readonly territoriesService: TerritoriesService) {}

  @Get()
  findAll() {
    return this.territoriesService.findAll();
  }
}
