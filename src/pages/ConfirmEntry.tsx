import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { MealType, FoodUnit } from '@/types';
import { calculateMacros, getQuantityStep } from '@/services/foodService';
import PageHeader from '@/components/PageHeader';
import MacroGrid from '@/components/MacroGrid';
import MealSelector from '@/components/MealSelector';

export default function ConfirmEntry() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { allFoods, addEntry } = useApp();

  const foodId = params.get('foodId');
  const foodNameParam = params.get('foodName');
  const preselectedMeal = (params.get('meal') || 'breakfast') as MealType;

  const food = foodId ? allFoods.find(f => f.id === foodId) : null;
  const baseName = food?.name || foodNameParam || 'Unknown food';
  const baseCal = food?.calories || +(params.get('cal') || 0);
  const basePro = food?.protein || +(params.get('pro') || 0);
  const baseCarb = food?.carbs || +(params.get('carb') || 0);
  const baseFat = food?.fat || +(params.get('fat') || 0);
  const baseQty = food?.baseQuantity || +(params.get('qty') || 1);
  const baseUnit = food?.baseUnit || (params.get('unit') as FoodUnit) || 'g';

  const [quantity, setQuantity] = useState(baseQty);
  const [unit] = useState<FoodUnit>(baseUnit);
  const [meal, setMeal] = useState<MealType>(preselectedMeal);

  const calculated = useMemo(
    () => calculateMacros({ calories: baseCal, protein: basePro, carbs: baseCarb, fat: baseFat, baseQuantity: baseQty }, quantity),
    [baseCal, basePro, baseCarb, baseFat, baseQty, quantity]
  );

  const step = getQuantityStep(unit);

  const handleSave = () => {
    const today = new Date().toISOString().split('T')[0];
    addEntry({
      date: today,
      mealType: meal,
      foodId: foodId || 'custom',
      foodName: baseName,
      quantity,
      unit,
      ...calculated,
    });
    navigate('/today');
  };

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24 max-w-lg mx-auto">
      <PageHeader title="Confirm entry" />

      <div className="space-y-4">
        {/* Food info */}
        <div className="card-surface p-5">
          <h2 className="text-lg font-bold text-foreground">{baseName}</h2>
          {food?.brand && <p className="text-xs text-muted-foreground mt-0.5">{food.brand}</p>}
        </div>

        {/* Quantity */}
        <div className="card-surface p-5 space-y-3">
          <label className="text-sm font-medium text-foreground">Quantity ({unit})</label>
          <div className="flex items-center gap-3">
            <button onClick={() => setQuantity(Math.max(0, quantity - step))} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground font-bold text-lg">−</button>
            <input type="number" value={quantity} onChange={e => setQuantity(Math.max(0, +e.target.value))} className="flex-1 text-center px-4 py-2.5 rounded-xl bg-background border border-border text-foreground text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary" />
            <button onClick={() => setQuantity(quantity + step)} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground font-bold text-lg">+</button>
          </div>
        </div>

        {/* Macros preview */}
        <div className="card-surface p-5">
          <MacroGrid
            calories={calculated.calories}
            protein={calculated.protein}
            carbs={calculated.carbs}
            fat={calculated.fat}
          />
        </div>

        {/* Meal selector */}
        <div className="card-surface p-5 space-y-3">
          <label className="text-sm font-medium text-foreground">Meal</label>
          <MealSelector selected={meal} onChange={setMeal} />
        </div>

        <button onClick={handleSave} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold transition-transform active:scale-[0.98]">
          Save entry
        </button>
      </div>
    </div>
  );
}
