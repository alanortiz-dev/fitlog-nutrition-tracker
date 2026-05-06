import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import AppLayout from '@/components/AppLayout';
import MacroRing from '@/components/MacroRing';
import MealSection from '@/components/MealSection';
import { MealType } from '@/types';
import { MEAL_TYPES } from '@/constants/meals';
import { groupEntriesByMeal } from '@/services/diaryService';
import { Plus, Flame } from 'lucide-react';

export default function Today() {
  const navigate = useNavigate();
  const { user, getEntriesForDate, getDaySummary, deleteEntry } = useApp();
  const today = new Date().toISOString().split('T')[0];
  const entries = getEntriesForDate(today);
  const summary = getDaySummary(today);
  const targets = user?.targets || { calories: 2000, protein: 150, carbs: 200, fat: 65 };

  const entriesByMeal = useMemo(() => groupEntriesByMeal(entries), [entries]);

  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const handleAddFood = (meal: MealType) => {
    navigate(`/add-food?meal=${meal}`);
  };

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{dateStr}</p>
            <h1 className="text-2xl font-bold text-foreground">Today</h1>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-foreground" />
            <span className="text-sm font-semibold text-foreground">FitLog</span>
          </div>
        </div>

        {/* Calories ring + macros */}
        <div className="card-surface p-5">
          <div className="flex items-center justify-center gap-6">
            <MacroRing consumed={summary.calories} target={targets.calories} label="Calories" unit="kcal" size="lg" />
            <div className="flex flex-col gap-3">
              <MacroRing consumed={summary.protein} target={targets.protein} label="Protein" unit="g" />
              <MacroRing consumed={summary.carbs} target={targets.carbs} label="Carbs" unit="g" />
              <MacroRing consumed={summary.fat} target={targets.fat} label="Fat" unit="g" />
            </div>
          </div>
        </div>

        {/* Meal sections */}
        <div className="space-y-3">
          {MEAL_TYPES.map(meal => (
            <MealSection
              key={meal}
              mealType={meal}
              entries={entriesByMeal[meal]}
              onAddFood={handleAddFood}
              onDeleteEntry={deleteEntry}
            />
          ))}
        </div>

        {/* Floating add */}
        <button
          onClick={() => navigate('/add-food')}
          className="fixed bottom-24 right-4 max-w-lg w-auto z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg transition-transform active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add food
        </button>
      </div>
    </AppLayout>
  );
}
