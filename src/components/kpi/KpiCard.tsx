import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  subtitle: React.ReactNode;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  isActive: boolean;
  onClick: () => void;
  tooltip: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  iconColor,
  isActive,
  onClick,
  tooltip
}) => {
  return (
    <div
      onClick={onClick}
      title={tooltip}
      className={`kpi-card bg-white rounded-xl p-5 border shadow-xs relative overflow-hidden transition ${
        isActive 
          ? 'active-filter border-blue-600 ring-2 ring-blue-500/20' 
          : 'border-slate-200/80 hover:border-slate-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`w-9 h-9 rounded-full ${iconBg} ${iconColor} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <div className="text-2xl sm:text-3xl font-bold text-slate-900">{value}</div>
        <div className="mt-1 text-xs">
          {subtitle}
        </div>
      </div>
    </div>
  );
};
