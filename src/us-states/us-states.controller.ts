import { Controller, Get } from '@nestjs/common';
import { UsStatesService } from './us-states.service';

@Controller('us_states')
export class UsStatesController {
  constructor(private readonly usStatesService: UsStatesService) {}

  @Get()
  findAll() {
    return this.usStatesService.findAll();
  }
}
