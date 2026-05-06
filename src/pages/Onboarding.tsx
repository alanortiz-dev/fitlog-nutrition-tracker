import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Sex, ActivityLevel, Goal } from '@/types';

const steps = ['basics', 'body', 'activity', 'goal', 'targets'] as const;

export default function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [sex, setSex] = useState<Sex>('male');
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('maintain');

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      completeOnboarding({ name, sex, age, weight, height, activityLevel, goal });
      navigate('/today');
    }
  };
  const back = () => { if (step > 0) setStep(step - 1); };

  const activityOptions: { value: ActivityLevel; label: string; desc: string }[] = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
    { value: 'light', label: 'Lightly active', desc: '1-3 days/week' },
    { value: 'moderate', label: 'Moderately active', desc: '3-5 days/week' },
    { value: 'active', label: 'Active', desc: '6-7 days/week' },
    { value: 'very_active', label: 'Very active', desc: 'Athlete level' },
  ];

  const goalOptions: { value: Goal; label: string; emoji: string }[] = [
    { value: 'lose_fat', label: 'Lose fat', emoji: '🔥' },
    { value: 'maintain', label: 'Maintain', emoji: '⚖️' },
    { value: 'gain_muscle', label: 'Gain muscle', emoji: '💪' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <button onClick={back} className={`p-2 -ml-2 ${step === 0 ? 'invisible' : 'text-muted-foreground'}`}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all ${i <= step ? 'w-8 bg-primary' : 'w-4 bg-muted'}`} />
          ))}
        </div>
        <div className="w-9" />
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {step === 0 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground">What's your name?</h2>
              <p className="text-sm text-muted-foreground mt-1">We'll personalize your experience</p>
            </div>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" autoFocus />
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Sex</label>
              <div className="flex gap-3">
                {(['male', 'female'] as Sex[]).map(s => (
                  <button key={s} onClick={() => setSex(s)} className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${sex === s ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground'}`}>
                    {s === 'male' ? 'Male' : 'Female'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Your body stats</h2>
              <p className="text-sm text-muted-foreground mt-1">This helps calculate your daily targets</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Age</label>
                <input type="number" value={age} onChange={e => setAge(+e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Weight (kg)</label>
                  <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Height (cm)</label>
                  <input type="number" value={height} onChange={e => setHeight(+e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Activity level</h2>
              <p className="text-sm text-muted-foreground mt-1">How active are you on a typical week?</p>
            </div>
            <div className="space-y-2">
              {activityOptions.map(opt => (
                <button key={opt.value} onClick={() => setActivityLevel(opt.value)} className={`w-full p-4 rounded-xl text-left transition-all ${activityLevel === opt.value ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground'}`}>
                  <p className="font-medium text-sm">{opt.label}</p>
                  <p className={`text-xs mt-0.5 ${activityLevel === opt.value ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground">What's your goal?</h2>
              <p className="text-sm text-muted-foreground mt-1">We'll adjust your targets accordingly</p>
            </div>
            <div className="space-y-3">
              {goalOptions.map(opt => (
                <button key={opt.value} onClick={() => setGoal(opt.value)} className={`w-full p-5 rounded-xl text-left flex items-center gap-4 transition-all ${goal === opt.value ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground'}`}>
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="font-semibold">{opt.label}</span>
                  {goal === opt.value && <Check className="w-5 h-5 ml-auto" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground">You're all set!</h2>
              <p className="text-sm text-muted-foreground mt-1">We'll generate personalized daily targets based on your profile. You can always adjust them later.</p>
            </div>
            <div className="card-surface p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">{name?.[0]?.toUpperCase() || '?'}</div>
                <div>
                  <p className="font-semibold text-foreground">{name || 'User'}</p>
                  <p className="text-xs text-muted-foreground">{sex === 'male' ? 'Male' : 'Female'} · {age}y · {weight}kg · {height}cm</p>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Goal: {goal === 'lose_fat' ? 'Lose fat' : goal === 'maintain' ? 'Maintain' : 'Gain muscle'}</p>
                <p className="text-xs text-muted-foreground">Activity: {activityLevel.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-sm mx-auto w-full pt-6">
        <button
          onClick={next}
          disabled={step === 0 && !name}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
        >
          {step === steps.length - 1 ? 'Start tracking' : 'Continue'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
