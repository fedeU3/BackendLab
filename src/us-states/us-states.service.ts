import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsState } from './us-state.entity';

@Injectable()
export class UsStatesService {
  constructor(
    @InjectRepository(UsState, 'northwind')
    private readonly repo: Repository<UsState>,
  ) {}

  findAll(): Promise<UsState[]> {
    return this.repo.find({ order: { stateId: 'ASC' } });
  }
}
