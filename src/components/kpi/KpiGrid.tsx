import React from 'react';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useLicense } from '../../context/LicenseContext';
import { KpiCard } from './KpiCard';

export const KpiGrid: React.FC = () => {
  const { metrics, filters, setFilter, showToast } = useLicense();

  const handleCardClick = (statusFilter: string, label: string) => {
    setFilter('status', statusFilter);
    showToast(`Filtered by ${label}`, 'info');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      
      {/* Card 1: Total Licenses */}
      <KpiCard
        title="Total Licenses"
        value={metrics.total}
        subtitle={
          <span className="flex items-center font-medium text-emerald-600">
            <ArrowUpwardIcon sx={{ fontSize: 13, mr: 0.25 }} />
            <span>12% vs last month</span>
          </span>
        }
        icon={<VpnKeyOutlinedIcon sx={{ fontSize: 18 }} />}
        iconBg="bg-sky-100"
        iconColor="text-sky-600"
        isActive={filters.status === 'ALL'}
        onClick={() => handleCardClick('ALL', 'all licenses')}
        tooltip="Click to view all licenses"
      />

      {/* Card 2: Active Licenses */}
      <KpiCard
        title="Active Licenses"
        value={metrics.active}
        subtitle={<span className="text-slate-500">85.6% utilization rate</span>}
        icon={<CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} />}
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
        isActive={filters.status === 'Active'}
        onClick={() => handleCardClick('Active', 'Active licenses')}
        tooltip="Click to filter by Active licenses"
      />

      {/* Card 3: Expired licenses */}
      <KpiCard
        title="Expired licenses"
        value={metrics.expired}
        subtitle={<span className="text-slate-500">Within next 30 days</span>}
        icon={<WarningAmberOutlinedIcon sx={{ fontSize: 18 }} />}
        iconBg="bg-amber-100"
        iconColor="text-amber-600"
        isActive={filters.status === 'Expiring' || filters.status === 'Expired'}
        onClick={() => handleCardClick('Expiring', 'Expiring licenses')}
        tooltip="Click to filter by Expiring licenses"
      />

      {/* Card 4: Suspended licenses */}
      <KpiCard
        title="Suspended licenses"
        value={metrics.suspended}
        subtitle={<span className="text-slate-500">Requires admin review</span>}
        icon={<BlockOutlinedIcon sx={{ fontSize: 18 }} />}
        iconBg="bg-rose-100"
        iconColor="text-rose-600"
        isActive={filters.status === 'Suspended' || filters.status === 'Rejected'}
        onClick={() => handleCardClick('Suspended', 'Suspended licenses')}
        tooltip="Click to filter by Suspended licenses"
      />

    </div>
  );
};
