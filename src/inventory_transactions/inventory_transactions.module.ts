import { Module } from '@nestjs/common';
import { InventoryTransactionsController } from './inventory_transactions.controller';
import { InventoryTransactionsService } from './inventory_transactions.service';

@Module({
  controllers: [InventoryTransactionsController],
  providers: [InventoryTransactionsService],
})
export class InventoryTransactionsModule {}
