import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shippers' })
export class Shipper {
  @PrimaryGeneratedColumn({ name: 'shipper_id' })
  shipperId!: number;

  @Column({ name: 'company_name', type: 'varchar' })
  companyName!: string;

  @Column({ type: 'varchar', nullable: true })
  phone!: string | null;
}
