import { describe, expect, jest } from '@jest/globals';
import categoryRepository from '../../repositories/categoryRepository';
import categoryService from '../categoryService';

describe('category test', () => {
  it('should return an object array', async () => {
    const result = await categoryService.getAll();
    expect(typeof result).toBe('object');
  });

  it('should return a not null array', async () => {
    const result = await categoryService.getAll();
    expect(result.length).not.toBeLessThanOrEqual(0);
  });
  it('should return a defined result', async () => {
    const result = await categoryService.getAll();
    expect(typeof result.length).not.toBe('undefined');
  });
});
