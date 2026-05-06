import { DiaryEntry, MealType, MacroSummary, DaySummary } from '@/types';

/**
 * Diary service — abstracts diary entry data access.
 * TODO: Replace with Supabase queries.
 */

export function getEntriesForDate(entries: DiaryEntry[], date: string): DiaryEntry[] {
  return entries.filter(e => e.date === date);
}

export function groupEntriesByMeal(entries: DiaryEntry[]): Record<MealType, DiaryEntry[]> {
  const grouped: Record<MealType, DiaryEntry[]> = { breakfast: [], lunch: [], dinner: [], snack: [] };
  entries.forEach(e => grouped[e.mealType].push(e));
  return grouped;
}

export function summarizeEntries(entries: DiaryEntry[]): MacroSummary {
  return entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

export function getDaySummaries(entries: DiaryEntry[]): DaySummary[] {
  const map = new Map<string, DaySummary>();
  entries.forEach(e => {
    const existing = map.get(e.date) || { date: e.date, calories: 0, protein: 0, carbs: 0, fat: 0, entries: [] };
    existing.calories += e.calories;
    existing.protein += e.protein;
    existing.carbs += e.carbs;
    existing.fat += e.fat;
    existing.entries.push(e);
    map.set(e.date, existing);
  });
  return Array.from(map.values()).sort((a, b) => b.date.localeCompare(a.date));
}

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDateLabel(date: string): string {
  const d = new Date(date + 'T12:00:00');
  const today = getTodayDateString();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (date === today) return 'Today';
  if (date === yesterday) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
