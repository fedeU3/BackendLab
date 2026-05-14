import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  createdAt: Date;
}

/**
 * Servicio de productos — simula una base de datos con un array en memoria.
 *
 * @Injectable() lo registra en el contenedor de DI de NestJS.
 * Al reiniciar la app los datos se pierden (es intencional para el lab).
 * Los 5 productos semilla se cargan en el constructor para que Swagger sea
 * usable sin setup manual.
 */
@Injectable()
export class ProductsService {
  // "Base de datos" en memoria — se reinicia con la app.
  private products: Product[] = [];
  private nextId = 1;

  constructor() {
    this.seed();
  }

  // Carga 5 productos de ejemplo para que la API tenga datos desde el inicio.
  private seed(): void {
    const seeds: Omit<Product, 'id' | 'createdAt'>[] = [
      { name: 'Laptop Pro 15', price: 1299.99, category: 'Electronics', stock: 25 },
      { name: 'Mechanical Keyboard', price: 89.99, category: 'Accessories', stock: 150 },
      { name: 'USB-C Hub', price: 49.99, category: 'Accessories', stock: 200 },
      { name: 'Monitor 4K 27"', price: 449.99, category: 'Electronics', stock: 40 },
      { name: 'Standing Desk', price: 299.99, category: 'Furniture', stock: 15 },
    ];
    for (const s of seeds) {
      this.products.push({ id: this.nextId++, ...s, createdAt: new Date() });
    }
  }

  create(dto: CreateProductDto): Product {
    const product: Product = { id: this.nextId++, ...dto, createdAt: new Date() };
    this.products.push(product);
    return product;
  }

  // Filtra el array en memoria; ambos filtros son opcionales y acumulativos.
  findAll(search?: string, category?: string): Product[] {
    return this.products.filter(p => {
      const matchesSearch = search ? p.name.toLowerCase().includes(search.toLowerCase()) : true;
      const matchesCategory = category ? p.category.toLowerCase() === category.toLowerCase() : true;
      return matchesSearch && matchesCategory;
    });
  }

  // Patrón "findOrFail": lanza una excepción HTTP directamente desde el servicio.
  // NestJS la captura y la convierte en la respuesta 404 correcta.
  findOneOrFail(id: number): Product {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  // Object.assign hace merge: solo sobreescribe los campos que vienen en dto.
  update(id: number, dto: UpdateProductDto): Product {
    const product = this.findOneOrFail(id);
    Object.assign(product, dto);
    return product;
  }

  remove(id: number): Product {
    const product = this.findOneOrFail(id);
    // filter crea un nuevo array sin el producto eliminado.
    this.products = this.products.filter(p => p.id !== id);
    return product;
  }
}
