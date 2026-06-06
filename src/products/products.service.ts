import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Product } from './products.entity';
import { CreateProductDto } from './DTO/CreateProductDTO';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product, 'northwind')
    private readonly productsRepo: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepo.find({ order: { productName: 'ASC' } });
  }

  async findById(productId: number): Promise<Product> {
    const product = await this.productsRepo.findOneBy({ productId });
    if (!product) throw new NotFoundException(`Producto con id ${productId} no encontrado`);
    return product;
  }

  findByName(name: string): Promise<Product[]> {
    return this.productsRepo.find({
      where: { productName: ILike(`%${name}%`) },
      order: { productName: 'ASC' },
    });
  }

  findByCategory(categoryId: number): Promise<Product[]> {
    return this.productsRepo.find({
      where: { categoryId },
      order: { productName: 'ASC' },
    });
  }

  findBySupplier(supplierId: number): Promise<Product[]> {
    return this.productsRepo.find({
      where: { supplierId },
      order: { productName: 'ASC' },
    });
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productsRepo.create({
      productName: dto.productName,
      supplierId: dto.supplierId ?? null,
      categoryId: dto.categoryId ?? null,
      quantityPerUnit: dto.quantityPerUnit ?? null,
      unitPrice: dto.unitPrice ?? null,
      unitsInStock: dto.unitsInStock ?? null,
      unitsOnOrder: dto.unitsOnOrder ?? null,
      reorderLevel: dto.reorderLevel ?? null,
      discontinued: dto.discontinued ?? 0,
    });
    return this.productsRepo.save(product);
  }

  async delete(productId: number): Promise<void> {
    const product = await this.productsRepo.findOneBy({ productId });
    if (!product) throw new NotFoundException(`Producto con id ${productId} no encontrado`);
    await this.productsRepo.delete({ productId });
  }
}
