import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee, 'northwind')
    private readonly repo: Repository<Employee>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.repo.find({ order: { employeeId: 'ASC' } });
  }
}
