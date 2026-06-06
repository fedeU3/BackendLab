import { Entity, PrimaryColumn } from 'typeorm';

// Tabla de unión muchos-a-muchos entre employees y territories
@Entity({ name: 'employee_territories' })
export class EmployeeTerritory {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId!: number;

  @PrimaryColumn({ name: 'territory_id' })
  territoryId!: string;
}
