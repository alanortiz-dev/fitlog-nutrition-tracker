import { MealType } from '@/types';
import { MEAL_OPTIONS } from '@/constants/meals';

interface MealSelectorProps {
  selected: MealType;
  onChange: (meal: MealType) => void;
}

export default function MealSelector({ selected, onChange }: MealSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {MEAL_OPTIONS.map(m => (
        <button
          key={m.value}
          onClick={() => onChange(m.value)}
          className={`py-3 rounded-xl text-center transition-all ${
            selected === m.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          <span className="text-lg">{m.emoji}</span>
          <p className="text-[10px] font-medium mt-0.5">{m.label}</p>
        </button>
      ))}
    </div>
  );
}
