import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import PageHeader from '@/components/PageHeader';
import FoodListItem from '@/components/FoodListItem';
import EmptyState from '@/components/EmptyState';
import { Food, FoodCategory } from '@/types';
import { searchFoods } from '@/services/foodService';

type Tab = 'all' | FoodCategory;

const TABS: { value: Tab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'product', label: 'Products' },
  { value: 'generic', label: 'Generic' },
  { value: 'custom', label: 'My foods' },
];

export default function SearchFood() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const meal = params.get('meal') || '';
  const { allFoods, customFoods } = useApp();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<Tab>('all');

  const filtered = useMemo(() => {
    const source = tab === 'custom' ? customFoods : allFoods;
    return searchFoods(source, query, tab === 'custom' ? undefined : tab);
  }, [allFoods, customFoods, query, tab]);

  const handleSelect = (food: Food) => {
    navigate(`/confirm?foodId=${food.id}${meal ? `&meal=${meal}` : ''}`);
  };

  return (
    <div className="min-h-screen bg-background px-5 pt-6 pb-24 max-w-lg mx-auto">
      <PageHeader title="Search food" />

      {/* Search input */}
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search foods..."
          autoFocus
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${tab === t.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <EmptyState
            message="No foods found"
            action={
              <button onClick={() => navigate(`/create-food${meal ? `?meal=${meal}` : ''}`)} className="text-sm font-medium text-foreground hover:underline">
                Create custom food
              </button>
            }
          />
        ) : (
          filtered.map(food => (
            <FoodListItem key={food.id} food={food} onSelect={handleSelect} />
          ))
        )}
      </div>
    </div>
  );
}
