import { Entity, PrimaryColumn } from 'typeorm';

// Tabla de unión muchos-a-muchos entre customers y customer_demographics
@Entity({ name: 'customer_customer_demo' })
export class CustomerCustomerDemo {
  @PrimaryColumn({ name: 'customer_id' })
  customerId!: string;

  @PrimaryColumn({ name: 'customer_type_id' })
  customerTypeId!: string;
}
