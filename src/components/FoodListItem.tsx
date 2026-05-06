import { Food } from '@/types';

interface FoodListItemProps {
  food: Food;
  onSelect: (food: Food) => void;
}

export default function FoodListItem({ food, onSelect }: FoodListItemProps) {
  return (
    <button
      onClick={() => onSelect(food)}
      className="w-full card-surface-hover p-4 text-left flex items-center justify-between"
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{food.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {food.brand && `${food.brand} · `}{food.baseQuantity} {food.baseUnit} · {Math.round(food.calories)} kcal
        </p>
      </div>
      <div className="text-right ml-3 shrink-0">
        <p className="text-xs text-muted-foreground">P {Math.round(food.protein)}g</p>
        <p className="text-xs text-muted-foreground">C {Math.round(food.carbs)}g · F {Math.round(food.fat)}g</p>
      </div>
    </button>
  );
}
