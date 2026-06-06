import { Column, Entity, PrimaryColumn } from 'typeorm';

// customer_id es un varchar(5) natural (ej: "ALFKI"), no auto-generado
@Entity({ name: 'customers' })
export class Customer {
  @PrimaryColumn({ name: 'customer_id', type: 'varchar' })
  customerId!: string;

  @Column({ name: 'company_name', type: 'varchar' })
  companyName!: string;

  @Column({ name: 'contact_name', type: 'varchar', nullable: true })
  contactName!: string | null;

  @Column({ name: 'contact_title', type: 'varchar', nullable: true })
  contactTitle!: string | null;

  @Column({ type: 'varchar', nullable: true })
  address!: string | null;

  @Column({ type: 'varchar', nullable: true })
  city!: string | null;

  @Column({ type: 'varchar', nullable: true })
  region!: string | null;

  @Column({ name: 'postal_code', type: 'varchar', nullable: true })
  postalCode!: string | null;

  @Column({ type: 'varchar', nullable: true })
  country!: string | null;

  @Column({ type: 'varchar', nullable: true })
  phone!: string | null;

  @Column({ type: 'varchar', nullable: true })
  fax!: string | null;
}
