import { describe, expect, jest } from '@jest/globals';
import categoryRepository from '../../repositories/categoryRepository';
import categoryService from '../categoryService';

describe('category test', () => {
  it('should return an object array', async () => {
    const result = await categoryService.getAll();
    jest.spyOn(categoryRepository, 'getCategories');
    expect(typeof result).toBe('object');
  });

  it('should return a not null array', async () => {
    const result = await categoryService.getAll();
    jest.spyOn(categoryRepository, 'getCategories');
    expect(result.length).not.toBeLessThanOrEqual(0);
  });
});
