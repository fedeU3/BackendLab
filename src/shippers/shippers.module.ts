import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipper } from './shipper.entity';
import { ShippersController } from './shippers.controller';
import { ShippersService } from './shippers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shipper], 'northwind')],
  controllers: [ShippersController],
  providers: [ShippersService],
})
export class ShippersModule {}
