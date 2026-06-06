import { Controller, Get } from '@nestjs/common';
import { CustomerCustomerDemoService } from './customer-customer-demo.service';

@Controller('customer_customer_demo')
export class CustomerCustomerDemoController {
  constructor(private readonly customerCustomerDemoService: CustomerCustomerDemoService) {}

  @Get()
  findAll() {
    return this.customerCustomerDemoService.findAll();
  }
}
