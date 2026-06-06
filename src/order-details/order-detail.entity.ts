import { Column, Entity, PrimaryColumn } from 'typeorm';

// Clave primaria compuesta: order_id + product_id
@Entity({ name: 'order_details' })
export class OrderDetail {
  @PrimaryColumn({ name: 'order_id' })
  orderId!: number;

  @PrimaryColumn({ name: 'product_id' })
  productId!: number;

  @Column({ name: 'unit_price', type: 'numeric' })
  unitPrice!: number;

  @Column({ type: 'smallint' })
  quantity!: number;

  @Column({ type: 'real' })
  discount!: number;
}
