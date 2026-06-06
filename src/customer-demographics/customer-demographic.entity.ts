import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'customer_demographics' })
export class CustomerDemographic {
  @PrimaryColumn({ name: 'customer_type_id', type: 'varchar' })
  customerTypeId!: string;

  @Column({ name: 'customer_desc', type: 'text', nullable: true })
  customerDesc!: string | null;
}
