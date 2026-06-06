import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'us_states' })
export class UsState {
  @PrimaryGeneratedColumn({ name: 'state_id' })
  stateId!: number;

  @Column({ name: 'state_name', type: 'varchar', nullable: true })
  stateName!: string | null;

  @Column({ name: 'state_abbr', type: 'varchar', nullable: true })
  stateAbbr!: string | null;

  @Column({ name: 'state_region', type: 'varchar', nullable: true })
  stateRegion!: string | null;
}
