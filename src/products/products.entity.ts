import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Supplier } from '../suppliers/supplier.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  productId!: number;

  @Column({ name: 'product_name', type: 'varchar' })
  productName!: string;

  @Column({ name: 'supplier_id', type: 'int', nullable: true })
  supplierId!: number | null;

  @ManyToOne(() => Supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier!: Supplier | null;

  @Column({ name: 'category_id', type: 'int', nullable: true })
  categoryId!: number | null;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category!: Category | null;

  @Column({ name: 'quantity_per_unit', type: 'varchar', nullable: true })
  quantityPerUnit!: string | null;

  @Column({ name: 'unit_price', type: 'numeric', nullable: true })
  unitPrice!: number | null;

  @Column({ name: 'units_in_stock', type: 'smallint', nullable: true })
  unitsInStock!: number | null;

  @Column({ name: 'units_on_order', type: 'smallint', nullable: true })
  unitsOnOrder!: number | null;

  @Column({ name: 'reorder_level', type: 'smallint', nullable: true })
  reorderLevel!: number | null;

  @Column({ type: 'smallint' })
  discontinued!: number;
}
