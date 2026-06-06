import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn({ name: 'employee_id' })
  employeeId!: number;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName!: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName!: string;

  @Column({ type: 'varchar', nullable: true })
  title!: string | null;

  @Column({ name: 'title_of_courtesy', type: 'varchar', nullable: true })
  titleOfCourtesy!: string | null;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate!: Date | null;

  @Column({ name: 'hire_date', type: 'date', nullable: true })
  hireDate!: Date | null;

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

  @Column({ name: 'home_phone', type: 'varchar', nullable: true })
  homePhone!: string | null;

  @Column({ type: 'varchar', nullable: true })
  extension!: string | null;

  @Column({ type: 'bytea', nullable: true })
  photo!: Buffer | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  // Self-referencing FK: supervisor del empleado
  @Column({ name: 'reports_to', type: 'int', nullable: true })
  reportsTo!: number | null;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'reports_to' })
  manager!: Employee | null;

  @Column({ name: 'photo_path', type: 'varchar', nullable: true })
  photoPath!: string | null;
}
