import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Customer } from './customers.entity';
import { CreateCustomerDto } from './DTO/CreateCustomersDTO';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer, 'northwind')
    private readonly customersRepo: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customersRepo.find({ order: { companyName: 'ASC' } });
  }

  async findById(customerId: string): Promise<Customer> {
    const customer = await this.customersRepo.findOneBy({ customerId });
    if (!customer) throw new NotFoundException(`Customer '${customerId}' no encontrado`);
    return customer;
  }

  findByCompany(name: string): Promise<Customer[]> {
    return this.customersRepo.find({
      where: { companyName: ILike(`%${name}%`) },
      order: { companyName: 'ASC' },
    });
  }

  findByCountry(country: string): Promise<Customer[]> {
    return this.customersRepo.find({
      where: { country: ILike(`%${country}%`) },
      order: { companyName: 'ASC' },
    });
  }

  async create(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customersRepo.create({
      customerId: dto.customerId,
      companyName: dto.companyName,
      contactName: dto.contactName ?? null,
      contactTitle: dto.contactTitle ?? null,
      address: dto.address ?? null,
      city: dto.city ?? null,
      region: dto.region ?? null,
      postalCode: dto.postalCode ?? null,
      country: dto.country ?? null,
      phone: dto.phone ?? null,
      fax: dto.fax ?? null,
    });
    return this.customersRepo.save(customer);
  }

  async delete(customerId: string): Promise<void> {
    const customer = await this.customersRepo.findOneBy({ customerId });
    if (!customer) throw new NotFoundException(`Customer '${customerId}' no encontrado`);
    await this.customersRepo.delete({ customerId });
  }
}
