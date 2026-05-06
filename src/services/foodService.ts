import { Food, FoodUnit } from '@/types';
import { mockFoods } from '@/data/mockData';

/**
 * Food service — abstracts food data access.
 * TODO: Replace mock implementations with Supabase queries.
 */

export function getAllFoods(): Food[] {
  return mockFoods;
}

export function getFoodById(id: string, allFoods: Food[]): Food | undefined {
  return allFoods.find(f => f.id === id);
}

export function searchFoods(
  foods: Food[],
  query: string,
  category?: 'product' | 'generic' | 'custom' | 'all'
): Food[] {
  let filtered = foods;
  if (category && category !== 'all') {
    filtered = foods.filter(f => f.category === category);
  }
  if (!query.trim()) return filtered;
  const q = query.toLowerCase();
  return filtered.filter(f =>
    f.name.toLowerCase().includes(q) || f.brand?.toLowerCase().includes(q)
  );
}

export function getFoodsByBarcode(barcode: string, allFoods: Food[]): Food | undefined {
  // TODO: Replace with external barcode API lookup
  return allFoods.find(f => f.barcode === barcode);
}

export function calculateMacros(
  food: { calories: number; protein: number; carbs: number; fat: number; baseQuantity: number },
  quantity: number
): { calories: number; protein: number; carbs: number; fat: number } {
  const multiplier = food.baseQuantity > 0 ? quantity / food.baseQuantity : 1;
  return {
    calories: Math.round(food.calories * multiplier * 10) / 10,
    protein: Math.round(food.protein * multiplier * 10) / 10,
    carbs: Math.round(food.carbs * multiplier * 10) / 10,
    fat: Math.round(food.fat * multiplier * 10) / 10,
  };
}

export function getQuantityStep(unit: FoodUnit): number {
  return unit === 'g' || unit === 'ml' ? 10 : 0.5;
}
