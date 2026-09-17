import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useLicense } from '../../context/LicenseContext';

interface TableToolbarProps {
  onOpenCreateModal: () => void;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({ onOpenCreateModal }) => {
  const { filters, setFilter, resetFilters, showToast } = useLicense();

  const hasActiveFilters = Boolean(
    filters.search || 
    filters.organization !== 'ALL' || 
    filters.licenseType !== 'ALL' || 
    filters.status !== 'ALL'
  );

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
      
      {/* Left Filter Group */}
      <div className="flex flex-wrap items-center gap-3 flex-1">
        
        {/* Search Input */}
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <SearchIcon sx={{ fontSize: 18 }} />
          </span>
          <input 
            type="text" 
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            placeholder="Search"
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-2xs"
          />
        </div>

        {/* Organization Filter */}
        <div className="relative">
          <select 
            value={filters.organization}
            onChange={(e) => setFilter('organization', e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer shadow-2xs"
          >
            <option value="ALL">Organization ↕</option>
            <option value="123 Inc">123 Inc</option>
            <option value="Acme Corp">Acme Corp</option>
            <option value="TechNova">TechNova</option>
            <option value="Starlight Systems">Starlight Systems</option>
            <option value="Nexus Cloud">Nexus Cloud</option>
            <option value="Horizon AI">Horizon AI</option>
            <option value="CyberPeak">CyberPeak</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
            <SwapVertIcon sx={{ fontSize: 16 }} />
          </div>
        </div>

        {/* License Type Filter */}
        <div className="relative">
          <select 
            value={filters.licenseType}
            onChange={(e) => setFilter('licenseType', e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer shadow-2xs"
          >
            <option value="ALL">License Type ↕</option>
            <option value="Standard">Standard</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Pro">Pro</option>
            <option value="Starter">Starter</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
            <SwapVertIcon sx={{ fontSize: 16 }} />
          </div>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select 
            value={filters.status}
            onChange={(e) => setFilter('status', e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer shadow-2xs"
          >
            <option value="ALL">Status ↕</option>
            <option value="Active">Active</option>
            <option value="Expiring">Expiring</option>
            <option value="Suspended">Suspended</option>
            <option value="Rejected">Rejected</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
            <SwapVertIcon sx={{ fontSize: 16 }} />
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button 
            type="button"
            onClick={() => {
              resetFilters();
              showToast('Filters reset', 'info');
            }}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1"
          >
            Reset Filters
          </button>
        )}

      </div>

      {/* Right Action: Create License Button */}
      <div>
        <button 
          type="button"
          onClick={onOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-xs hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer"
        >
          <NoteAddOutlinedIcon sx={{ fontSize: 18 }} />
          <span>Create License</span>
        </button>
      </div>

    </div>
  );
};
