interface MacroRingProps {
  consumed: number;
  target: number;
  label: string;
  unit?: string;
  size?: 'sm' | 'lg';
  color?: string;
}

export default function MacroRing({ consumed, target, label, unit = 'kcal', size = 'sm' }: MacroRingProps) {
  const pct = Math.min((consumed / target) * 100, 100);
  const remaining = Math.max(target - consumed, 0);
  const isLg = size === 'lg';
  const svgSize = isLg ? 120 : 64;
  const strokeWidth = isLg ? 8 : 5;
  const radius = (svgSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg width={svgSize} height={svgSize} className="-rotate-90">
          <circle cx={svgSize / 2} cy={svgSize / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
          <circle cx={svgSize / 2} cy={svgSize / 2} r={radius} fill="none" stroke="hsl(var(--lime))" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700 ease-out" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isLg ? (
            <>
              <span className="text-2xl font-bold text-foreground">{Math.round(consumed)}</span>
              <span className="text-[10px] text-muted-foreground">{unit}</span>
            </>
          ) : (
            <span className="text-xs font-bold text-foreground">{Math.round(consumed)}</span>
          )}
        </div>
      </div>
      {isLg ? (
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{Math.round(remaining)} {unit} left</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-[10px] font-medium text-muted-foreground">{label}</p>
          <p className="text-[10px] text-muted-foreground">{Math.round(remaining)}{unit === 'kcal' ? '' : 'g'} left</p>
        </div>
      )}
    </div>
  );
}
