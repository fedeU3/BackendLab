import { Controller, Get } from '@nestjs/common';
import { CustomerDemographicsService } from './customer-demographics.service';

@Controller('customer_demographics')
export class CustomerDemographicsController {
  constructor(private readonly customerDemographicsService: CustomerDemographicsService) {}

  @Get()
  findAll() {
    return this.customerDemographicsService.findAll();
  }
}
