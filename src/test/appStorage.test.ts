import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearSession,
  loadAppState,
  persistDemoSession,
  persistStandardSession,
  updateCurrentModeState,
} from '@/services/appStorage';

const STORAGE_KEY = 'fitlog.app.v1';

describe('appStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('restores standard onboarding and diary state after reload', () => {
    persistStandardSession();

    updateCurrentModeState(current => ({
      ...current,
      user: {
        id: 'user-1',
        name: 'Alan',
        sex: 'male',
        age: 30,
        weight: 80,
        height: 178,
        activityLevel: 'moderate',
        goal: 'maintain',
        targets: {
          calories: 2400,
          protein: 160,
          carbs: 250,
          fat: 70,
        },
      },
      customFoods: [
        {
          id: 'custom-1',
          name: 'Homemade oats bowl',
          source: 'custom',
          category: 'custom',
          baseUnit: 'g',
          baseQuantity: 100,
          calories: 220,
          protein: 12,
          carbs: 30,
          fat: 7,
        },
      ],
      entries: [
        {
          id: 'entry-1',
          date: '2026-05-18',
          mealType: 'breakfast',
          foodId: 'custom-1',
          foodName: 'Homemade oats bowl',
          quantity: 100,
          unit: 'g',
          calories: 220,
          protein: 12,
          carbs: 30,
          fat: 7,
          createdAt: '2026-05-18T12:00:00.000Z',
        },
      ],
    }));

    const restored = loadAppState();

    expect(restored.isAuthenticated).toBe(true);
    expect(restored.isDemo).toBe(false);
    expect(restored.user?.name).toBe('Alan');
    expect(restored.user?.targets.calories).toBe(2400);
    expect(restored.entries).toHaveLength(1);
    expect(restored.customFoods).toHaveLength(1);
    expect(restored.allFoods.some(food => food.id === 'custom-1')).toBe(true);
  });

  it('keeps demo state isolated from standard state', () => {
    persistStandardSession();
    updateCurrentModeState(current => ({
      ...current,
      user: {
        id: 'user-1',
        name: 'Alan',
        sex: 'male',
        age: 30,
        weight: 80,
        height: 178,
        activityLevel: 'moderate',
        goal: 'maintain',
        targets: {
          calories: 2400,
          protein: 160,
          carbs: 250,
          fat: 70,
        },
      },
      entries: [],
      customFoods: [],
    }));

    persistDemoSession();
    updateCurrentModeState(current => ({
      ...current,
      entries: current.entries.slice(0, 1),
    }));

    let restored = loadAppState();
    expect(restored.isDemo).toBe(true);
    expect(restored.user?.name).toBe('Alex');
    expect(restored.entries).toHaveLength(1);

    persistStandardSession();
    restored = loadAppState();

    expect(restored.isDemo).toBe(false);
    expect(restored.user?.name).toBe('Alan');
    expect(restored.entries).toHaveLength(0);
  });

  it('clears only the active session flag on logout', () => {
    persistStandardSession();
    updateCurrentModeState(current => ({
      ...current,
      user: {
        id: 'user-1',
        name: 'Alan',
        sex: 'male',
        age: 30,
        weight: 80,
        height: 178,
        activityLevel: 'moderate',
        goal: 'maintain',
        targets: {
          calories: 2400,
          protein: 160,
          carbs: 250,
          fat: 70,
        },
      },
      entries: [],
      customFoods: [],
    }));

    clearSession();

    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    const restored = loadAppState();

    expect(stored.session.isAuthenticated).toBe(false);
    expect(stored.standard.user.name).toBe('Alan');
    expect(restored.isAuthenticated).toBe(false);
    expect(restored.user?.name).toBe('Alan');
  });
});
