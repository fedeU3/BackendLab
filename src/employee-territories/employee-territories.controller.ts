import { Controller, Get } from '@nestjs/common';
import { EmployeeTerritoriesService } from './employee-territories.service';

@Controller('employee_territories')
export class EmployeeTerritoriesController {
  constructor(private readonly employeeTerritoriesService: EmployeeTerritoriesService) {}

  @Get()
  findAll() {
    return this.employeeTerritoriesService.findAll();
  }
}
