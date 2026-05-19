import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
  });

  describe('create', () => {
    it('should add the product to the array and return it', () => {
      const dto = { name: 'Test Product', price: 9.99, category: 'Test', stock: 10 };
      const before = service.findAll().length;
      const created = service.create(dto);
      expect(created.id).toBeDefined();
      expect(created.name).toBe(dto.name);
      expect(created.price).toBe(dto.price);
      expect(service.findAll().length).toBe(before + 1);
    });
  });

  describe('findAll', () => {
    it('should return all seeded products when no filter is applied', () => {
      expect(service.findAll().length).toBeGreaterThan(0);
    });

    it('should filter by partial name match (search)', () => {
      const result = service.findAll('Laptop');
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(p => p.name.toLowerCase().includes('laptop'))).toBe(true);
    });

    it('should filter by exact category (case-insensitive)', () => {
      const result = service.findAll(undefined, 'electronics');
      expect(result.length).toBeGreaterThan(0);
      expect(result.every(p => p.category.toLowerCase() === 'electronics')).toBe(true);
    });

    it('should return empty array when no product matches both filters', () => {
      const result = service.findAll('Laptop', 'Furniture');
      expect(result).toHaveLength(0);
    });
  });

  describe('findOneOrFail', () => {
    it('should return the product when it exists', () => {
      const product = service.findOneOrFail(1);
      expect(product).toBeDefined();
      expect(product.id).toBe(1);
    });

    it('should throw NotFoundException when product does not exist', () => {
      expect(() => service.findOneOrFail(9999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should merge partial fields and leave others unchanged', () => {
      const product = service.findOneOrFail(1);
      const originalName = product.name;
      const updated = service.update(1, { price: 1.99 });
      expect(updated.name).toBe(originalName);
      expect(updated.price).toBe(1.99);
    });

    it('should throw NotFoundException when updating a non-existent product', () => {
      expect(() => service.update(9999, { price: 1.99 })).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the product and return the deleted object', () => {
      const before = service.findAll().length;
      const removed = service.remove(1);
      expect(removed.id).toBe(1);
      expect(service.findAll().length).toBe(before - 1);
    });

    it('should throw NotFoundException when removing a non-existent product', () => {
      expect(() => service.remove(9999)).toThrow(NotFoundException);
    });
  });
});
