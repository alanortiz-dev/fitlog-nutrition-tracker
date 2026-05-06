import { useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import AppLayout from '@/components/AppLayout';
import EmptyState from '@/components/EmptyState';
import { getDaySummaries, formatDateLabel } from '@/services/diaryService';

export default function History() {
  const { entries, user } = useApp();
  const targets = user?.targets || { calories: 2000, protein: 150, carbs: 200, fat: 65 };

  const days = useMemo(() => getDaySummaries(entries), [entries]);

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">History</h1>

        {days.length === 0 ? (
          <EmptyState message="No entries yet. Start logging food!" />
        ) : (
          <div className="space-y-3">
            {days.map(day => {
              const calPct = Math.min((day.calories / targets.calories) * 100, 100);
              return (
                <div key={day.date} className="card-surface p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{formatDateLabel(day.date)}</h3>
                    <span className="lime-pill">{Math.round(day.calories)} kcal</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${calPct}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>P {Math.round(day.protein)}g</span>
                    <span>C {Math.round(day.carbs)}g</span>
                    <span>F {Math.round(day.fat)}g</span>
                    <span>{day.entries.length} items</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
