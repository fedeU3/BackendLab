import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './order-detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail, 'northwind')
    private readonly repo: Repository<OrderDetail>,
  ) {}

  findAll(): Promise<OrderDetail[]> {
    return this.repo.find({ order: { orderId: 'ASC' } });
  }
}
