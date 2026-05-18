import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { UserProfile, DiaryEntry, Food, MacroTargets, Goal, ActivityLevel, Sex } from '@/types';
import { clearSession, loadAppState, persistDemoSession, persistStandardSession, updateCurrentModeState } from '@/services/appStorage';

interface AppState {
  isAuthenticated: boolean;
  isDemo: boolean;
  user: UserProfile | null;
  entries: DiaryEntry[];
  customFoods: Food[];
  allFoods: Food[];
}

interface AppContextType extends AppState {
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  loginDemo: () => void;
  logout: () => void;
  completeOnboarding: (profile: Omit<UserProfile, 'id' | 'targets'>) => void;
  addEntry: (entry: Omit<DiaryEntry, 'id' | 'createdAt'>) => void;
  updateEntry: (id: string, updates: Partial<DiaryEntry>) => void;
  deleteEntry: (id: string) => void;
  addCustomFood: (food: Omit<Food, 'id' | 'source' | 'category'>) => void;
  updateTargets: (targets: MacroTargets) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  getEntriesForDate: (date: string) => DiaryEntry[];
  getDaySummary: (date: string) => { calories: number; protein: number; carbs: number; fat: number };
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

function generateId() {
  return Math.random().toString(36).substring(2, 12);
}

function calculateTargets(profile: { sex: Sex; age: number; weight: number; height: number; activityLevel: ActivityLevel; goal: Goal }): MacroTargets {
  // Mifflin-St Jeor
  let bmr: number;
  if (profile.sex === 'male') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }
  const multipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
  };
  let tdee = bmr * multipliers[profile.activityLevel];
  if (profile.goal === 'lose_fat') tdee -= 400;
  if (profile.goal === 'gain_muscle') tdee += 300;
  const calories = Math.round(tdee);
  const protein = Math.round(profile.weight * 2);
  const fat = Math.round(calories * 0.25 / 9);
  const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
  return { calories, protein, carbs, fat };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadAppState());

  const login = useCallback((_email: string, _password: string) => {
    // TODO: Replace with Supabase auth
    persistStandardSession();
    setState(loadAppState());
  }, []);

  const signup = useCallback((_email: string, _password: string) => {
    // TODO: Replace with Supabase auth
    persistStandardSession();
    setState(loadAppState());
  }, []);

  const loginDemo = useCallback(() => {
    persistDemoSession();
    setState(loadAppState());
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setState(loadAppState());
  }, []);

  const completeOnboarding = useCallback((profile: Omit<UserProfile, 'id' | 'targets'>) => {
    const targets = calculateTargets(profile);
    setState(updateCurrentModeState(current => ({
      ...current,
      user: { ...profile, id: generateId(), targets },
    })));
  }, []);

  const addEntry = useCallback((entry: Omit<DiaryEntry, 'id' | 'createdAt'>) => {
    const newEntry: DiaryEntry = { ...entry, id: generateId(), createdAt: new Date().toISOString() };
    setState(updateCurrentModeState(current => ({
      ...current,
      entries: [...current.entries, newEntry],
    })));
  }, []);

  const updateEntry = useCallback((id: string, updates: Partial<DiaryEntry>) => {
    setState(updateCurrentModeState(current => ({
      ...current,
      entries: current.entries.map(e => e.id === id ? { ...e, ...updates } : e),
    })));
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setState(updateCurrentModeState(current => ({
      ...current,
      entries: current.entries.filter(e => e.id !== id),
    })));
  }, []);

  const addCustomFood = useCallback((food: Omit<Food, 'id' | 'source' | 'category'>) => {
    const newFood: Food = { ...food, id: generateId(), source: 'custom', category: 'custom' };
    setState(updateCurrentModeState(current => ({
      ...current,
      customFoods: [...current.customFoods, newFood],
    })));
  }, []);

  const updateTargets = useCallback((targets: MacroTargets) => {
    setState(updateCurrentModeState(current => current.user ? {
      ...current,
      user: { ...current.user, targets },
    } : current));
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setState(updateCurrentModeState(current => current.user ? {
      ...current,
      user: { ...current.user, ...updates },
    } : current));
  }, []);

  const getEntriesForDate = useCallback((date: string) => {
    return state.entries.filter(e => e.date === date);
  }, [state.entries]);

  const getDaySummary = useCallback((date: string) => {
    const dayEntries = state.entries.filter(e => e.date === date);
    return dayEntries.reduce((acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  }, [state.entries]);

  return (
    <AppContext.Provider value={{
      ...state, login, signup, loginDemo, logout, completeOnboarding,
      addEntry, updateEntry, deleteEntry, addCustomFood,
      updateTargets, updateProfile, getEntriesForDate, getDaySummary,
    }}>
      {children}
    </AppContext.Provider>
  );
}
