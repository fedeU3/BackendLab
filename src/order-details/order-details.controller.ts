import { Controller, Get } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';

@Controller('order_details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Get()
  findAll() {
    return this.orderDetailsService.findAll();
  }
}
