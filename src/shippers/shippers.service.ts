import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipper } from './shipper.entity';

@Injectable()
export class ShippersService {
  constructor(
    @InjectRepository(Shipper, 'northwind')
    private readonly repo: Repository<Shipper>,
  ) {}

  findAll(): Promise<Shipper[]> {
    return this.repo.find({ order: { shipperId: 'ASC' } });
  }
}
