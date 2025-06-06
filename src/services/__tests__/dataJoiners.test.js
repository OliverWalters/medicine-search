import { describe, it, expect } from 'vitest';
import { joinPharmClass, joinActiveIngredients, joinPackaging, joinRoutes, joinProductStatus } from '../dataJoiners.js';

describe('dataJoiners helpers', () => {
  it('joinPharmClass removes duplicates and joins with commas', () => {
    const data = { pharm_class: ['classA', 'classB', 'classA'] };
    const result = joinPharmClass(data);
    expect(result).toBe('classA, classB');
  });

  it('joinActiveIngredients joins ingredient names', () => {
    const data = { active_ingredients: [{ name: 'Ing1' }, { name: 'Ing2' }] };
    const result = joinActiveIngredients(data);
    expect(result).toBe('Ing1, Ing2');
  });

  it('joinPackaging joins packaging descriptions', () => {
    const data = { packaging: [{ description: 'Pack1' }, { description: 'Pack2' }] };
    const result = joinPackaging(data);
    expect(result).toBe('Pack1, Pack2');
  });

  it('joinRoutes joins route strings', () => {
    const data = { route: ['oral', 'topical'] };
    const result = joinRoutes(data);
    expect(result).toBe('oral, topical');
  });

  it('joinProductStatus returns correct status', () => {
    expect(joinProductStatus({ finished: true })).toBe('Product finished');
    expect(joinProductStatus({ finished: false })).toBe('Product in development');
  });
});
