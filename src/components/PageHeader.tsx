import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  right?: ReactNode;
}

export default function PageHeader({ title, showBack = true, onBack, right }: PageHeaderProps) {
  const navigate = useNavigate();
  const handleBack = onBack || (() => navigate(-1));

  return (
    <div className="flex items-center gap-3 mb-6">
      {showBack && (
        <button onClick={handleBack} className="p-2 -ml-2 text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      <h1 className="text-xl font-bold text-foreground flex-1">{title}</h1>
      {right}
    </div>
  );
}
