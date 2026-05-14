import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

/**
 * Controlador REST para productos — Lab 1 CRUD completo.
 *
 * @Controller('lab1/products') define el prefijo de ruta base.
 * @ApiTags agrupa los endpoints bajo "Lab 1 – Fundamentos" en Swagger UI.
 *
 * NestJS inyecta ProductsService automáticamente gracias al sistema de DI:
 * el servicio está en providers[] del Lab1Module.
 */
@ApiTags('Lab 1 – Fundamentos')
@Controller('lab1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Query() sin nombre captura todos los query params.
  // Pasamos search y category por separado (strings opcionales).
  @Get()
  @ApiOperation({ summary: 'List all products', description: 'Supports ?search= and ?category= filters' })
  @ApiQuery({ name: 'search', required: false, description: 'Filter by name (partial match)' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by exact category' })
  @ApiResponse({ status: 200, description: 'Product list returned' })
  findAll(@Query('search') search?: string, @Query('category') category?: string) {
    return { data: this.productsService.findAll(search, category) };
  }

  // ParseIntPipe convierte el param ':id' de string a number y lanza 400 si no es un entero válido.
  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return { data: this.productsService.findOneOrFail(id) };
  }

  // @Body() deserializa el JSON del request y lo valida con class-validator.
  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ status: 201, description: 'Product created' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  create(@Body() dto: CreateProductDto) {
    return { data: this.productsService.create(dto), message: 'Product created successfully' };
  }

  // PATCH vs PUT: PATCH es actualización parcial (solo los campos enviados).
  // PUT reemplaza el recurso completo.
  @Patch(':id')
  @ApiOperation({ summary: 'Partially update a product' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return { data: this.productsService.update(id, dto), message: 'Product updated successfully' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return { data: this.productsService.remove(id), message: 'Product deleted successfully' };
  }
}
