import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerDemographic } from './customer-demographic.entity';
import { CustomerDemographicsController } from './customer-demographics.controller';
import { CustomerDemographicsService } from './customer-demographics.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerDemographic], 'northwind')],
  controllers: [CustomerDemographicsController],
  providers: [CustomerDemographicsService],
})
export class CustomerDemographicsModule {}
