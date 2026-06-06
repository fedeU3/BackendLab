import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeTerritory } from './employee-territory.entity';
import { EmployeeTerritoriesController } from './employee-territories.controller';
import { EmployeeTerritoriesService } from './employee-territories.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeTerritory], 'northwind')],
  controllers: [EmployeeTerritoriesController],
  providers: [EmployeeTerritoriesService],
})
export class EmployeeTerritoriesModule {}
