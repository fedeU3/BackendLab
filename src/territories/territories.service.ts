import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Territory } from './territory.entity';

@Injectable()
export class TerritoriesService {
  constructor(
    @InjectRepository(Territory, 'northwind')
    private readonly repo: Repository<Territory>,
  ) {}

  findAll(): Promise<Territory[]> {
    return this.repo.find({ order: { territoryId: 'ASC' } });
  }
}
