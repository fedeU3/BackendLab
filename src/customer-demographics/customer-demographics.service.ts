import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerDemographic } from './customer-demographic.entity';

@Injectable()
export class CustomerDemographicsService {
  constructor(
    @InjectRepository(CustomerDemographic, 'northwind')
    private readonly repo: Repository<CustomerDemographic>,
  ) {}

  findAll(): Promise<CustomerDemographic[]> {
    return this.repo.find();
  }
}
