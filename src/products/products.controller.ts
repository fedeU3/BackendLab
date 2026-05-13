import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './DTO/CreateProductDTO';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getHello(): string {
    return this.productsService.getHello();
  }

  @Get('all')
  getAll() {
    return this.productsService.getAll();
  }

  @Get('name/:name')
  async getProductByName(@Param('name') name: string) {
    return this.productsService.getByName(name);
  }

  @Get('type/:type')
  async getProductByType(@Param('type') type: string) {
    return this.productsService.getByType(type);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDTO) {
    return this.productsService.createProduct(createProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.deleteProduct(id);
  }
}
