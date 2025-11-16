export function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${color} border border-border`} />
      <span>{label}</span>
    </div>
  );
}