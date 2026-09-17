import React from 'react';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// ==============================================================================
// KpiCards Component
// The 4 top statistic cards from the layout screenshot.
// Clicking any card filters the table by that status!
// ==============================================================================
interface KpiCardsProps {
  activeFilter: string;
  onFilterChange: (status: string) => void;
  totalCount: string;
  activeCount: string;
  expiredCount: string;
  suspendedCount: string;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
  activeFilter,
  onFilterChange,
  totalCount,
  activeCount,
  expiredCount,
  suspendedCount
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      
      {/* 1. Total Licenses */}
      <div
        onClick={() => onFilterChange('ALL')}
        className={`kpi-card bg-white rounded-xl p-5 border transition cursor-pointer ${
          activeFilter === 'ALL' ? 'active-filter border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200/80 hover:border-slate-300'
        }`}
        title="Click to view all licenses"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Licenses</span>
          <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
            <VpnKeyOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">{totalCount}</div>
          <div className="mt-1 flex items-center text-xs font-medium text-emerald-600">
            <ArrowUpwardIcon sx={{ fontSize: 14, mr: 0.25 }} />
            <span>12% vs last month</span>
          </div>
        </div>
      </div>

      {/* 2. Active Licenses */}
      <div
        onClick={() => onFilterChange('Active')}
        className={`kpi-card bg-white rounded-xl p-5 border transition cursor-pointer ${
          activeFilter === 'Active' ? 'active-filter border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200/80 hover:border-slate-300'
        }`}
        title="Click to filter by Active licenses"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Licenses</span>
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">{activeCount}</div>
          <div className="mt-1 text-xs text-slate-500">85.6% utilization rate</div>
        </div>
      </div>

      {/* 3. Expired licenses */}
      <div
        onClick={() => onFilterChange('Expiring')}
        className={`kpi-card bg-white rounded-xl p-5 border transition cursor-pointer ${
          activeFilter === 'Expiring' || activeFilter === 'Expired' ? 'active-filter border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200/80 hover:border-slate-300'
        }`}
        title="Click to filter by Expiring licenses"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expired licenses</span>
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
            <WarningAmberOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">{expiredCount}</div>
          <div className="mt-1 text-xs text-slate-500">Within next 30 days</div>
        </div>
      </div>

      {/* 4. Suspended licenses */}
      <div
        onClick={() => onFilterChange('Suspended')}
        className={`kpi-card bg-white rounded-xl p-5 border transition cursor-pointer ${
          activeFilter === 'Suspended' || activeFilter === 'Rejected' ? 'active-filter border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200/80 hover:border-slate-300'
        }`}
        title="Click to filter by Suspended licenses"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Suspended licenses</span>
          <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
            <BlockOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">{suspendedCount}</div>
          <div className="mt-1 text-xs text-slate-500">Requires admin review</div>
        </div>
      </div>

    </div>
  );
};
