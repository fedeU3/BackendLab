import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'region' })
export class Region {
  @PrimaryGeneratedColumn({ name: 'region_id' })
  regionId!: number;

  @Column({ name: 'region_description' })
  regionDescription!: string;
}
