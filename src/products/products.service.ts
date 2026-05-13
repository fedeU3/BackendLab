import { Injectable, NotFoundException } from '@nestjs/common';
// import { ILike, Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ProductsEntity } from './products.entity';
import { CreateProductDTO } from './DTO/CreateProductDTO';

@Injectable()
export class ProductsService {

  // constructor(
  //   @InjectRepository(ProductsEntity)
  //   private readonly productsRepository: Repository<ProductsEntity>,
  // ) {}

  getHello(): string {
    return 'Hello World! Products';
  }

  getAll() {
    // return this.productsRepository.find();
  }

  getByName(nombre: string) {
    if (!nombre) {
      throw new NotFoundException(`Producto con nombre ${nombre} no encontrado`);
    }
    // return this.productsRepository.find({
    //   where: { nombre: ILike(`%${nombre}%`) },
    // });
  }

  getByType(tipo: string) {
    // return this.productsRepository.find({
    //   where: { tipo: ILike(`%${tipo}%`) },
    // });
  }

  async createProduct(createProductDto: CreateProductDTO) {
    // const product = this.productsRepository.create(createProductDto as any);
    // return this.productsRepository.save(product);
  }

  async deleteProduct(id: number): Promise<void> {
    // const product = await this.productsRepository.findOneBy({ id });
    // if (!product) {
    //   throw new NotFoundException(`Producto con id ${id} no encontrado`);
    // }
    // await this.productsRepository.delete(id);
  }
}
