import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Camera, Search, PenTool } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageHeader from '@/components/PageHeader';
import MacroGrid from '@/components/MacroGrid';

type ScanState = 'scanning' | 'found' | 'not_found';

export default function BarcodeScan() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { allFoods } = useApp();
  const meal = params.get('meal') || '';
  const [state, setState] = useState<ScanState>('scanning');
  // TODO: Replace with real barcode scanner and API lookup
  const mockProduct = allFoods.find(f => f.barcode);

  const simulateScan = (found: boolean) => {
    setState(found ? 'found' : 'not_found');
  };

  const mealParam = meal ? `?meal=${meal}` : '';

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24 max-w-lg mx-auto">
      <PageHeader title="Scan barcode" />

      {state === 'scanning' && (
        <div className="space-y-6 animate-fade-in">
          {/* TODO: Replace with real camera/barcode scanner */}
          <div className="card-surface aspect-[4/3] flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground text-center px-8">Point your camera at a barcode to scan it</p>
            <p className="text-xs text-muted-foreground">Simulated scanner — tap buttons below</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => simulateScan(true)} className="py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm">Simulate: Found</button>
            <button onClick={() => simulateScan(false)} className="py-3 rounded-xl bg-card border border-border text-foreground font-medium text-sm">Simulate: Not found</button>
          </div>
        </div>
      )}

      {state === 'found' && mockProduct && (
        <div className="space-y-6 animate-fade-in">
          <div className="card-surface p-5 space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">{mockProduct.brand}</p>
              <h2 className="text-lg font-bold text-foreground">{mockProduct.name}</h2>
            </div>
            <MacroGrid
              calories={mockProduct.calories}
              protein={mockProduct.protein}
              carbs={mockProduct.carbs}
              fat={mockProduct.fat}
            />
            <p className="text-xs text-muted-foreground">Per {mockProduct.baseQuantity} {mockProduct.baseUnit}</p>
          </div>
          <button
            onClick={() => navigate(`/confirm?foodId=${mockProduct.id}${meal ? `&meal=${meal}` : ''}`)}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold"
          >
            Add this food
          </button>
          <button onClick={() => setState('scanning')} className="w-full py-3 text-sm text-muted-foreground font-medium">Scan another</button>
        </div>
      )}

      {state === 'not_found' && (
        <div className="space-y-6 animate-fade-in">
          <div className="card-surface p-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-muted mx-auto flex items-center justify-center">
              <Camera className="w-7 h-7 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Product not found</h2>
            <p className="text-sm text-muted-foreground">We couldn't find this barcode. Try another option:</p>
          </div>
          <div className="space-y-3">
            <button onClick={() => navigate(`/search${mealParam}`)} className="w-full card-surface-hover p-4 flex items-center gap-3 text-left">
              <Search className="w-5 h-5 text-foreground" />
              <span className="font-medium text-foreground text-sm">Search manually</span>
            </button>
            <button onClick={() => navigate(`/create-food${mealParam}`)} className="w-full card-surface-hover p-4 flex items-center gap-3 text-left">
              <PenTool className="w-5 h-5 text-foreground" />
              <span className="font-medium text-foreground text-sm">Create custom food</span>
            </button>
          </div>
          <button onClick={() => setState('scanning')} className="w-full py-3 text-sm text-muted-foreground font-medium">Try scanning again</button>
        </div>
      )}
    </div>
  );
}
