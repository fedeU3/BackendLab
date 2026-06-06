import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  categoryId!: number;

  @Column({ name: 'category_name', type: 'varchar' })
  categoryName!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'bytea', nullable: true })
  picture!: Buffer | null;
}
