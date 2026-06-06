import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier, 'northwind')
    private readonly repo: Repository<Supplier>,
  ) {}

  findAll(): Promise<Supplier[]> {
    return this.repo.find({ order: { supplierId: 'ASC' } });
  }
}
