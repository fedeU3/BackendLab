import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../customers/customers.entity';
import { Employee } from '../employees/employee.entity';
import { Shipper } from '../shippers/shipper.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  orderId!: number;

  @Column({ name: 'customer_id', type: 'varchar', nullable: true })
  customerId!: string | null;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer | null;

  @Column({ name: 'employee_id', type: 'int', nullable: true })
  employeeId!: number | null;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee!: Employee | null;

  @Column({ name: 'order_date', type: 'date', nullable: true })
  orderDate!: Date | null;

  @Column({ name: 'required_date', type: 'date', nullable: true })
  requiredDate!: Date | null;

  @Column({ name: 'shipped_date', type: 'date', nullable: true })
  shippedDate!: Date | null;

  // ship_via es FK hacia shippers.shipper_id
  @Column({ name: 'ship_via', type: 'int', nullable: true })
  shipVia!: number | null;

  @ManyToOne(() => Shipper)
  @JoinColumn({ name: 'ship_via' })
  shipper!: Shipper | null;

  @Column({ type: 'numeric', nullable: true })
  freight!: number | null;

  @Column({ name: 'ship_name', type: 'varchar', nullable: true })
  shipName!: string | null;

  @Column({ name: 'ship_address', type: 'varchar', nullable: true })
  shipAddress!: string | null;

  @Column({ name: 'ship_city', type: 'varchar', nullable: true })
  shipCity!: string | null;

  @Column({ name: 'ship_region', type: 'varchar', nullable: true })
  shipRegion!: string | null;

  @Column({ name: 'ship_postal_code', type: 'varchar', nullable: true })
  shipPostalCode!: string | null;

  @Column({ name: 'ship_country', type: 'varchar', nullable: true })
  shipCountry!: string | null;
}
