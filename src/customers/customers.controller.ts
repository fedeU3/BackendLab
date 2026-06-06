import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './DTO/CreateCustomersDTO';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get('search')
  findByCompany(@Query('name') name: string) {
    return this.customersService.findByCompany(name);
  }

  @Get('country/:country')
  findByCountry(@Param('country') country: string) {
    return this.customersService.findByCountry(country);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.customersService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customersService.delete(id);
  }
}
