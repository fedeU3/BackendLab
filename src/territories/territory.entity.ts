import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Region } from '../region/region.entity';

@Entity({ name: 'territories' })
export class Territory {
  // territory_id es un varchar en Northwind (ej: "01581"), no auto-generado
  @PrimaryColumn({ name: 'territory_id', type: 'varchar' })
  territoryId!: string;

  @Column({ name: 'territory_description', type: 'varchar' })
  territoryDescription!: string;

  @Column({ name: 'region_id', type: 'int' })
  regionId!: number;

  @ManyToOne(() => Region)
  @JoinColumn({ name: 'region_id' })
  region!: Region;
}
