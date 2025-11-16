import React from "react";

interface RankIndicatorProps {
  rank: number;
  color: string;
  label: string;
}

export function RankIndicator({ rank, color, label }: RankIndicatorProps) {
  return (
    <div
      className="flex items-center gap-2"
      title={label}
      aria-label={`${label}: posição ${rank}`}
    >
      {/* Barra lateral colorida */}
      <div
        className={`w-1.5 h-5 rounded-full ${color}`}
        aria-hidden="true"
      />
      {/* Número da posição */}
      <span className="font-medium text-sm">{rank}</span>
    </div>
  );
}
