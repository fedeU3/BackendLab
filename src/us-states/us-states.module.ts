import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsState } from './us-state.entity';
import { UsStatesController } from './us-states.controller';
import { UsStatesService } from './us-states.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsState], 'northwind')],
  controllers: [UsStatesController],
  providers: [UsStatesService],
})
export class UsStatesModule {}
