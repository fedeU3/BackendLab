import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region, 'northwind')
    private readonly repo: Repository<Region>,
  ) {}

  findAll(): Promise<Region[]> {
    return this.repo.find({ order: { regionId: 'ASC' } });
  }
}
