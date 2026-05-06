import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Clock, Plus, User } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showNav?: boolean;
  showBack?: boolean;
  headerRight?: ReactNode;
}

export default function AppLayout({ children, showNav = true }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/today', icon: Home, label: 'Today' },
    { path: '/history', icon: Clock, label: 'History' },
    { path: '/add-food', icon: Plus, label: 'Add', isSpecial: true },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-50">
          <div className="max-w-lg mx-auto bg-card border-t border-border px-2 py-2">
            <div className="flex items-center justify-around">
              {navItems.map(item => {
                const isActive = location.pathname === item.path || (item.path === '/today' && location.pathname === '/today');
                if (item.isSpecial) {
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground -mt-6 shadow-lg transition-transform active:scale-95"
                    >
                      <item.icon className="w-6 h-6" />
                    </button>
                  );
                }
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-foreground' : ''}`} />
                    <span className="text-[10px] font-medium">{item.label}</span>
                    {isActive && <div className="w-1 h-1 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
