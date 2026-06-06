import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeTerritory } from './employee-territory.entity';

@Injectable()
export class EmployeeTerritoriesService {
  constructor(
    @InjectRepository(EmployeeTerritory, 'northwind')
    private readonly repo: Repository<EmployeeTerritory>,
  ) {}

  findAll(): Promise<EmployeeTerritory[]> {
    return this.repo.find({ order: { employeeId: 'ASC' } });
  }
}
