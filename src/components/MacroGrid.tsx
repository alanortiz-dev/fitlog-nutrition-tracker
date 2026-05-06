interface MacroGridItem {
  label: string;
  value: number;
  unit: string;
}

interface MacroGridProps {
  items?: MacroGridItem[];
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export default function MacroGrid({ items, calories, protein, carbs, fat }: MacroGridProps) {
  const gridItems: MacroGridItem[] = items || [
    { label: 'Calories', value: Math.round(calories || 0), unit: 'kcal' },
    { label: 'Protein', value: Math.round(protein || 0), unit: 'g' },
    { label: 'Carbs', value: Math.round(carbs || 0), unit: 'g' },
    { label: 'Fat', value: Math.round(fat || 0), unit: 'g' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {gridItems.map(m => (
        <div key={m.label} className="bg-muted rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-foreground">{m.value}</p>
          <p className="text-[10px] text-muted-foreground">{m.unit}</p>
          <p className="text-[10px] text-muted-foreground">{m.label}</p>
        </div>
      ))}
    </div>
  );
}
