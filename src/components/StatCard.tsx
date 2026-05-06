interface StatCardProps {
  value: string | number;
  label: string;
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-muted rounded-xl p-3 text-center">
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
