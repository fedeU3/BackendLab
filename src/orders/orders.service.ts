import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { CreateOrderDto } from './DTO/CreateOrdersDTO';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order, 'northwind')
    private readonly ordersRepo: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepo.find({ order: { orderId: 'DESC' } });
  }

  async findById(orderId: number): Promise<Order> {
    const order = await this.ordersRepo.findOneBy({ orderId });
    if (!order) throw new NotFoundException(`Orden con id ${orderId} no encontrada`);
    return order;
  }

  findByCustomer(customerId: string): Promise<Order[]> {
    return this.ordersRepo.find({
      where: { customerId },
      order: { orderDate: 'DESC' },
    });
  }

  findByEmployee(employeeId: number): Promise<Order[]> {
    return this.ordersRepo.find({
      where: { employeeId },
      order: { orderDate: 'DESC' },
    });
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepo.create({
      customerId: dto.customerId ?? null,
      employeeId: dto.employeeId ?? null,
      orderDate: dto.orderDate ? new Date(dto.orderDate) : null,
      requiredDate: dto.requiredDate ? new Date(dto.requiredDate) : null,
      shipVia: dto.shipVia ?? null,
      freight: dto.freight ?? null,
      shipName: dto.shipName ?? null,
      shipAddress: dto.shipAddress ?? null,
      shipCity: dto.shipCity ?? null,
      shipRegion: dto.shipRegion ?? null,
      shipPostalCode: dto.shipPostalCode ?? null,
      shipCountry: dto.shipCountry ?? null,
    });
    return this.ordersRepo.save(order);
  }

  async delete(orderId: number): Promise<void> {
    const order = await this.ordersRepo.findOneBy({ orderId });
    if (!order) throw new NotFoundException(`Orden con id ${orderId} no encontrada`);
    await this.ordersRepo.delete({ orderId });
  }
}
