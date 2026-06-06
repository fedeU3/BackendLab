import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerCustomerDemo } from './customer-customer-demo.entity';

@Injectable()
export class CustomerCustomerDemoService {
  constructor(
    @InjectRepository(CustomerCustomerDemo, 'northwind')
    private readonly repo: Repository<CustomerCustomerDemo>,
  ) {}

  findAll(): Promise<CustomerCustomerDemo[]> {
    return this.repo.find();
  }
}
