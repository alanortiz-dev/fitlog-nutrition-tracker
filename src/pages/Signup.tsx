import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Flame } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with Supabase auth
    signup(email, password);
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      <button onClick={() => navigate('/')} className="self-start p-2 -ml-2 text-muted-foreground">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <Flame className="w-10 h-10 text-foreground mx-auto" />
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <p className="text-sm text-muted-foreground">Start tracking your nutrition today</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="At least 6 characters" />
          </div>
          <button type="submit" className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold transition-transform active:scale-[0.98]">Create account</button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="font-medium text-foreground hover:underline">Log in</button>
        </p>
      </div>
    </div>
  );
}
