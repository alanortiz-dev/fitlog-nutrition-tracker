export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type FoodSource = 'barcode' | 'search' | 'custom';

export type FoodUnit = 'piece' | 'g' | 'ml' | 'serving' | 'cup';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export type Goal = 'lose_fat' | 'maintain' | 'gain_muscle';

export type Sex = 'male' | 'female';

export type FoodCategory = 'product' | 'generic' | 'custom';

export interface MacroSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MacroTargets extends MacroSummary {}

export interface Food {
  id: string;
  name: string;
  brand?: string;
  barcode?: string;
  source: FoodSource;
  baseUnit: FoodUnit;
  baseQuantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category?: FoodCategory;
}

export interface DiaryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  mealType: MealType;
  foodId: string;
  foodName: string; // snapshot
  quantity: number;
  unit: FoodUnit;
  calories: number; // snapshot (already calculated)
  protein: number;
  carbs: number;
  fat: number;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  sex: Sex;
  age: number;
  weight: number; // kg
  height: number; // cm
  activityLevel: ActivityLevel;
  goal: Goal;
  targets: MacroTargets;
}

export interface DaySummary extends MacroSummary {
  date: string;
  entries: DiaryEntry[];
}
