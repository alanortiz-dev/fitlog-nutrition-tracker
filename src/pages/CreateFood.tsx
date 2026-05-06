import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { FoodUnit } from '@/types';
import { FOOD_UNITS } from '@/constants/units';
import PageHeader from '@/components/PageHeader';

export default function CreateFood() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const meal = params.get('meal') || '';
  const { addCustomFood } = useApp();

  const [name, setName] = useState('');
  const [baseUnit, setBaseUnit] = useState<FoodUnit>('g');
  const [baseQuantity, setBaseQuantity] = useState(100);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [saveToMyFoods, setSaveToMyFoods] = useState(true);

  const macroFields = [
    { label: 'Calories (kcal)', value: calories, set: setCalories },
    { label: 'Protein (g)', value: protein, set: setProtein },
    { label: 'Carbs (g)', value: carbs, set: setCarbs },
    { label: 'Fat (g)', value: fat, set: setFat },
  ];

  const handleSave = () => {
    if (!name.trim()) return;
    const food = { name, baseUnit, baseQuantity, calories, protein, carbs, fat };
    if (saveToMyFoods) addCustomFood(food);
    navigate(`/confirm?foodName=${encodeURIComponent(name)}&cal=${calories}&pro=${protein}&carb=${carbs}&fat=${fat}&unit=${baseUnit}&qty=${baseQuantity}${meal ? `&meal=${meal}` : ''}`);
  };

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24 max-w-lg mx-auto">
      <PageHeader title="Create food" />

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Food name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Corn tortilla" autoFocus />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Base unit</label>
            <select value={baseUnit} onChange={e => setBaseUnit(e.target.value as FoodUnit)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              {FOOD_UNITS.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Base quantity</label>
            <input type="number" value={baseQuantity} onChange={e => setBaseQuantity(+e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <div className="card-surface p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">Nutrition per {baseQuantity} {baseUnit}</p>
          <div className="grid grid-cols-2 gap-3">
            {macroFields.map(f => (
              <div key={f.label} className="space-y-1">
                <label className="text-xs text-muted-foreground">{f.label}</label>
                <input type="number" value={f.value} onChange={e => f.set(+e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 card-surface">
          <label className="text-sm font-medium text-foreground">Save to My Foods</label>
          <button onClick={() => setSaveToMyFoods(!saveToMyFoods)} className={`w-11 h-6 rounded-full transition-colors relative ${saveToMyFoods ? 'bg-primary' : 'bg-muted'}`}>
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${saveToMyFoods ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>

        <button onClick={handleSave} disabled={!name.trim()} className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold disabled:opacity-50 transition-transform active:scale-[0.98]">
          Continue
        </button>
      </div>
    </div>
  );
}
