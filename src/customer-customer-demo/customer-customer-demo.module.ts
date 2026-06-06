import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerCustomerDemo } from './customer-customer-demo.entity';
import { CustomerCustomerDemoController } from './customer-customer-demo.controller';
import { CustomerCustomerDemoService } from './customer-customer-demo.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerCustomerDemo], 'northwind')],
  controllers: [CustomerCustomerDemoController],
  providers: [CustomerCustomerDemoService],
})
export class CustomerCustomerDemoModule {}
