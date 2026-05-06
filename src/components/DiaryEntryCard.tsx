import { DiaryEntry } from '@/types';
import { Trash2 } from 'lucide-react';

interface DiaryEntryCardProps {
  entry: DiaryEntry;
  onDelete: (id: string) => void;
}

export default function DiaryEntryCard({ entry, onDelete }: DiaryEntryCardProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{entry.foodName}</p>
        <p className="text-xs text-muted-foreground">
          {entry.quantity} {entry.unit} · {Math.round(entry.calories)} kcal
        </p>
      </div>
      <div className="flex items-center gap-3 ml-2">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">P {Math.round(entry.protein)}g</p>
          <p className="text-xs text-muted-foreground">
            C {Math.round(entry.carbs)}g · F {Math.round(entry.fat)}g
          </p>
        </div>
        <button
          onClick={() => onDelete(entry.id)}
          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
