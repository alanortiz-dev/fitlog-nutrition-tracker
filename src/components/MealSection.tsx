import { DiaryEntry, MealType } from '@/types';
import { MEAL_LABELS, MEAL_EMOJIS } from '@/constants/meals';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useState } from 'react';
import DiaryEntryCard from '@/components/DiaryEntryCard';

interface MealSectionProps {
  mealType: MealType;
  entries: DiaryEntry[];
  onAddFood: (meal: MealType) => void;
  onDeleteEntry: (id: string) => void;
}

export default function MealSection({ mealType, entries, onAddFood, onDeleteEntry }: MealSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const totalCals = entries.reduce((sum, e) => sum + e.calories, 0);

  return (
    <div className="card-surface p-4">
      <button onClick={() => setExpanded(!expanded)} className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <span className="text-lg">{MEAL_EMOJIS[mealType]}</span>
          <h3 className="font-semibold text-foreground">{MEAL_LABELS[mealType]}</h3>
          {entries.length > 0 && (
            <span className="lime-pill text-xs">{Math.round(totalCals)} kcal</span>
          )}
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2">
          {entries.length === 0 ? (
            <p className="text-sm text-muted-foreground py-2">No foods logged yet</p>
          ) : (
            entries.map(entry => (
              <DiaryEntryCard key={entry.id} entry={entry} onDelete={onDeleteEntry} />
            ))
          )}
          <button
            onClick={() => onAddFood(mealType)}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors pt-1"
          >
            <Plus className="w-4 h-4" />
            Add food
          </button>
        </div>
      )}
    </div>
  );
}
