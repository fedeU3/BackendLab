import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { InventoryTransactionsModule } from './inventory_transactions/inventory_transactions.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { StringsModule } from './strings/strings.module';

@Module({
  imports: [CustomersModule, InventoryTransactionsModule, OrdersModule, ProductsModule, StringsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
