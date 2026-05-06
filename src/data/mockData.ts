import { Food, DiaryEntry, UserProfile } from '@/types';

export const mockFoods: Food[] = [
  { id: 'f1', name: 'Scrambled Eggs', source: 'search', baseUnit: 'piece', baseQuantity: 1, calories: 91, protein: 6.1, carbs: 1, fat: 6.7, category: 'generic' },
  { id: 'f2', name: 'Chicken Breast (grilled)', source: 'search', baseUnit: 'g', baseQuantity: 100, calories: 165, protein: 31, carbs: 0, fat: 3.6, category: 'generic' },
  { id: 'f3', name: 'White Rice (cooked)', source: 'search', baseUnit: 'g', baseQuantity: 100, calories: 130, protein: 2.7, carbs: 28, fat: 0.3, category: 'generic' },
  { id: 'f4', name: 'Oats', source: 'search', baseUnit: 'g', baseQuantity: 100, calories: 389, protein: 16.9, carbs: 66, fat: 6.9, category: 'generic' },
  { id: 'f5', name: 'Avocado', source: 'search', baseUnit: 'g', baseQuantity: 100, calories: 160, protein: 2, carbs: 8.5, fat: 14.7, category: 'generic' },
  { id: 'f6', name: 'Corn Tortilla', source: 'search', baseUnit: 'piece', baseQuantity: 1, calories: 52, protein: 1.4, carbs: 10.7, fat: 0.7, category: 'generic' },
  { id: 'f7', name: 'Nopales (cooked)', source: 'search', baseUnit: 'g', baseQuantity: 100, calories: 16, protein: 1.3, carbs: 3.3, fat: 0.1, category: 'generic' },
  { id: 'f8', name: 'Greek Yogurt (plain)', source: 'search', baseUnit: 'g', baseQuantity: 100, calories: 59, protein: 10, carbs: 3.6, fat: 0.4, category: 'generic' },
  { id: 'f9', name: 'Tuna (canned in water)', source: 'search', baseUnit: 'g', baseQuantity: 100, calories: 116, protein: 25.5, carbs: 0, fat: 0.8, category: 'generic' },
  { id: 'f10', name: 'Coca-Cola Zero', source: 'barcode', barcode: '5000112611809', brand: 'Coca-Cola', baseUnit: 'ml', baseQuantity: 330, calories: 1, protein: 0, carbs: 0, fat: 0, category: 'product' },
  { id: 'f11', name: 'Banana', source: 'search', baseUnit: 'piece', baseQuantity: 1, calories: 105, protein: 1.3, carbs: 27, fat: 0.4, category: 'generic' },
  { id: 'f12', name: 'Whole Wheat Bread', source: 'search', baseUnit: 'piece', baseQuantity: 1, calories: 79, protein: 4, carbs: 13.8, fat: 1.1, category: 'generic' },
  { id: 'f13', name: 'Olive Oil', source: 'search', baseUnit: 'ml', baseQuantity: 15, calories: 119, protein: 0, carbs: 0, fat: 13.5, category: 'generic' },
  { id: 'f14', name: 'Almonds', source: 'search', baseUnit: 'g', baseQuantity: 30, calories: 174, protein: 6.4, carbs: 5.6, fat: 15, category: 'generic' },
  { id: 'f15', name: 'Protein Bar', source: 'barcode', barcode: '7501234567890', brand: 'FitBar', baseUnit: 'piece', baseQuantity: 1, calories: 210, protein: 20, carbs: 22, fat: 8, category: 'product' },
];

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export const demoEntries: DiaryEntry[] = [
  // Today
  { id: 'e1', date: getToday(), mealType: 'breakfast', foodId: 'f4', foodName: 'Oats', quantity: 60, unit: 'g', calories: 233, protein: 10.1, carbs: 39.6, fat: 4.1, createdAt: new Date().toISOString() },
  { id: 'e2', date: getToday(), mealType: 'breakfast', foodId: 'f11', foodName: 'Banana', quantity: 1, unit: 'piece', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, createdAt: new Date().toISOString() },
  { id: 'e3', date: getToday(), mealType: 'breakfast', foodId: 'f8', foodName: 'Greek Yogurt (plain)', quantity: 150, unit: 'g', calories: 89, protein: 15, carbs: 5.4, fat: 0.6, createdAt: new Date().toISOString() },
  { id: 'e4', date: getToday(), mealType: 'lunch', foodId: 'f2', foodName: 'Chicken Breast (grilled)', quantity: 180, unit: 'g', calories: 297, protein: 55.8, carbs: 0, fat: 6.5, createdAt: new Date().toISOString() },
  { id: 'e5', date: getToday(), mealType: 'lunch', foodId: 'f3', foodName: 'White Rice (cooked)', quantity: 150, unit: 'g', calories: 195, protein: 4.1, carbs: 42, fat: 0.5, createdAt: new Date().toISOString() },
  { id: 'e6', date: getToday(), mealType: 'snack', foodId: 'f14', foodName: 'Almonds', quantity: 30, unit: 'g', calories: 174, protein: 6.4, carbs: 5.6, fat: 15, createdAt: new Date().toISOString() },
  // Yesterday
  { id: 'e7', date: getYesterday(), mealType: 'breakfast', foodId: 'f1', foodName: 'Scrambled Eggs', quantity: 3, unit: 'piece', calories: 273, protein: 18.3, carbs: 3, fat: 20.1, createdAt: new Date().toISOString() },
  { id: 'e8', date: getYesterday(), mealType: 'breakfast', foodId: 'f6', foodName: 'Corn Tortilla', quantity: 2, unit: 'piece', calories: 104, protein: 2.8, carbs: 21.4, fat: 1.4, createdAt: new Date().toISOString() },
  { id: 'e9', date: getYesterday(), mealType: 'lunch', foodId: 'f9', foodName: 'Tuna (canned in water)', quantity: 130, unit: 'g', calories: 151, protein: 33.2, carbs: 0, fat: 1, createdAt: new Date().toISOString() },
  { id: 'e10', date: getYesterday(), mealType: 'lunch', foodId: 'f5', foodName: 'Avocado', quantity: 80, unit: 'g', calories: 128, protein: 1.6, carbs: 6.8, fat: 11.8, createdAt: new Date().toISOString() },
  { id: 'e11', date: getYesterday(), mealType: 'dinner', foodId: 'f2', foodName: 'Chicken Breast (grilled)', quantity: 200, unit: 'g', calories: 330, protein: 62, carbs: 0, fat: 7.2, createdAt: new Date().toISOString() },
  { id: 'e12', date: getYesterday(), mealType: 'dinner', foodId: 'f7', foodName: 'Nopales (cooked)', quantity: 150, unit: 'g', calories: 24, protein: 2, carbs: 5, fat: 0.2, createdAt: new Date().toISOString() },
  { id: 'e13', date: getYesterday(), mealType: 'snack', foodId: 'f15', foodName: 'Protein Bar', quantity: 1, unit: 'piece', calories: 210, protein: 20, carbs: 22, fat: 8, createdAt: new Date().toISOString() },
];

export const demoProfile: UserProfile = {
  id: 'demo-user',
  name: 'Alex',
  sex: 'male',
  age: 28,
  weight: 78,
  height: 178,
  activityLevel: 'moderate',
  goal: 'lose_fat',
  targets: {
    calories: 2100,
    protein: 160,
    carbs: 200,
    fat: 70,
  },
};
