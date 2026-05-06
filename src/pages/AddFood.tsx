import { useNavigate, useSearchParams } from 'react-router-dom';
import { ScanBarcode, Search, PenTool } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

interface AddFoodOption {
  icon: typeof ScanBarcode;
  label: string;
  desc: string;
  path: string;
}

export default function AddFood() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const preselectedMeal = params.get('meal') || '';
  const mealParam = preselectedMeal ? `?meal=${preselectedMeal}` : '';

  const options: AddFoodOption[] = [
    { icon: ScanBarcode, label: 'Scan barcode', desc: 'Find products instantly', path: `/scan${mealParam}` },
    { icon: Search, label: 'Search food', desc: 'Search our database', path: `/search${mealParam}` },
    { icon: PenTool, label: 'Create custom food', desc: 'Add your own food', path: `/create-food${mealParam}` },
  ];

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24 max-w-lg mx-auto">
      <PageHeader title="Add food" />

      <div className="space-y-3">
        {options.map(opt => (
          <button
            key={opt.label}
            onClick={() => navigate(opt.path)}
            className="w-full card-surface-hover p-5 flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-lime-soft flex items-center justify-center shrink-0">
              <opt.icon className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{opt.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
