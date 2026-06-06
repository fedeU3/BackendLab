import { Controller, Get } from '@nestjs/common';
import { ShippersService } from './shippers.service';

@Controller('shippers')
export class ShippersController {
  constructor(private readonly shippersService: ShippersService) {}

  @Get()
  findAll() {
    return this.shippersService.findAll();
  }
}
