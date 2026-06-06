import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lab1Module } from './lab1/lab1.module';
import { Lab2Module } from './lab2/lab2.module';
import { Lab3Module } from './lab3/lab3.module';

// Northwind feature modules
import { CategoriesModule } from './categories/categories.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { EmployeesModule } from './employees/employees.module';
import { ShippersModule } from './shippers/shippers.module';
import { TerritoriesModule } from './territories/territories.module';
import { RegionModule } from './region/region.module';
import { EmployeeTerritoriesModule } from './employee-territories/employee-territories.module';
import { CustomerDemographicsModule } from './customer-demographics/customer-demographics.module';
import { CustomerCustomerDemoModule } from './customer-customer-demo/customer-customer-demo.module';
import { UsStatesModule } from './us-states/us-states.module';

// Lab3 entities (conexión default)
import { User } from './lab3/auth/entities/user.entity';
import { Post } from './lab3/posts/entities/post.entity';

// Northwind entities (conexión 'northwind')
import { Category } from './categories/category.entity';
import { Supplier } from './suppliers/supplier.entity';
import { Customer } from './customers/customers.entity';
import { Product } from './products/products.entity';
import { Order } from './orders/orders.entity';
import { OrderDetail } from './order-details/order-detail.entity';
import { Employee } from './employees/employee.entity';
import { Shipper } from './shippers/shipper.entity';
import { Territory } from './territories/territory.entity';
import { Region } from './region/region.entity';
import { EmployeeTerritory } from './employee-territories/employee-territory.entity';
import { CustomerDemographic } from './customer-demographics/customer-demographic.entity';
import { CustomerCustomerDemo } from './customer-customer-demo/customer-customer-demo.entity';
import { UsState } from './us-states/us-state.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexión default → User y Post (synchronize: false — las tablas deben existir en la DB)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        ssl: { rejectUnauthorized: false },
        synchronize: false,
        entities: [User, Post],
        logging: false,
      }),
    }),

    // Conexión 'northwind' → mapea las tablas existentes sin modificarlas
    TypeOrmModule.forRootAsync({
      name: 'northwind',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        ssl: { rejectUnauthorized: false },
        synchronize: false,
        entities: [
          Category,
          Supplier,
          Customer,
          Product,
          Order,
          OrderDetail,
          Employee,
          Shipper,
          Territory,
          Region,
          EmployeeTerritory,
          CustomerDemographic,
          CustomerCustomerDemo,
          UsState,
        ],
        logging: false,
      }),
    }),

    Lab1Module,
    Lab2Module,
    Lab3Module,

    // Northwind feature modules
    CategoriesModule,
    SuppliersModule,
    CustomersModule,
    ProductsModule,
    OrdersModule,
    OrderDetailsModule,
    EmployeesModule,
    ShippersModule,
    TerritoriesModule,
    RegionModule,
    EmployeeTerritoriesModule,
    CustomerDemographicsModule,
    CustomerCustomerDemoModule,
    UsStatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
