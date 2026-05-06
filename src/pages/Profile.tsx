import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import AppLayout from '@/components/AppLayout';
import MacroGrid from '@/components/MacroGrid';
import StatCard from '@/components/StatCard';
import { LogOut } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateTargets, updateProfile, logout } = useApp();
  const [editing, setEditing] = useState(false);

  const [calories, setCalories] = useState(user?.targets.calories || 2000);
  const [protein, setProtein] = useState(user?.targets.protein || 150);
  const [carbs, setCarbs] = useState(user?.targets.carbs || 200);
  const [fat, setFat] = useState(user?.targets.fat || 65);
  const [weight, setWeight] = useState(user?.weight || 70);
  const [height, setHeight] = useState(user?.height || 170);

  const targetFields = [
    { label: 'Calories (kcal)', value: calories, set: setCalories },
    { label: 'Protein (g)', value: protein, set: setProtein },
    { label: 'Carbs (g)', value: carbs, set: setCarbs },
    { label: 'Fat (g)', value: fat, set: setFat },
  ];

  const handleSave = () => {
    updateTargets({ calories, protein, carbs, fat });
    updateProfile({ weight, height });
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>

        {/* User info */}
        <div className="card-surface p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
            {user?.name?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="font-semibold text-foreground text-lg">{user?.name || 'User'}</p>
            <p className="text-sm text-muted-foreground">{user?.sex === 'male' ? 'Male' : 'Female'} · {user?.age}y · {user?.goal?.replace('_', ' ')}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="card-surface p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Body Stats</h2>
            {!editing && <button onClick={() => setEditing(true)} className="text-sm font-medium text-muted-foreground hover:text-foreground">Edit</button>}
          </div>
          {editing ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Weight (kg)</label>
                <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Height (cm)</label>
                <input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <StatCard value={user?.weight || 70} label="kg" />
              <StatCard value={user?.height || 170} label="cm" />
            </div>
          )}
        </div>

        {/* Targets */}
        <div className="card-surface p-5 space-y-4">
          <h2 className="font-semibold text-foreground">Daily Targets</h2>
          {editing ? (
            <div className="grid grid-cols-2 gap-3">
              {targetFields.map(f => (
                <div key={f.label} className="space-y-1">
                  <label className="text-xs text-muted-foreground">{f.label}</label>
                  <input type="number" value={f.value} onChange={e => f.set(+e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              ))}
            </div>
          ) : (
            <MacroGrid
              calories={user?.targets.calories || 2000}
              protein={user?.targets.protein || 150}
              carbs={user?.targets.carbs || 200}
              fat={user?.targets.fat || 65}
            />
          )}
          {editing && (
            <div className="flex gap-3">
              <button onClick={() => setEditing(false)} className="flex-1 py-3 rounded-xl bg-muted text-foreground font-medium text-sm">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm">Save</button>
            </div>
          )}
        </div>

        {/* Logout */}
        <button onClick={handleLogout} className="w-full card-surface p-4 flex items-center justify-center gap-2 text-destructive font-medium">
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </AppLayout>
  );
}
