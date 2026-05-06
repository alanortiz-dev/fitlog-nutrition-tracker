import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Flame, ScanBarcode, Search, PenTool } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const { loginDemo } = useApp();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm space-y-10">
        {/* Brand */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-2">
            <Flame className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight">FitLog</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Track your calories and macros with ease. Scan barcodes, search foods, or create your own.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: ScanBarcode, label: 'Scan' },
            { icon: Search, label: 'Search' },
            { icon: PenTool, label: 'Create' },
          ].map(f => (
            <div key={f.label} className="card-surface p-4 flex flex-col items-center gap-2">
              <f.icon className="w-5 h-5 text-foreground" />
              <span className="text-xs font-medium text-muted-foreground">{f.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <button
            onClick={() => { loginDemo(); navigate('/today'); }}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base transition-transform active:scale-[0.98]"
          >
            Try demo
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="w-full py-3.5 rounded-xl bg-foreground text-background font-semibold text-base transition-transform active:scale-[0.98]"
          >
            Create account
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Already have an account? Log in
          </button>
        </div>
      </div>
    </div>
  );
}
