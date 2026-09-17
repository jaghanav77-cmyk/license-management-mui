import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { License } from '../types';

// ==============================================================================
// LicenseTable Component
// Contains:
// 1. Search & Filter Toolbar
// 2. Data Table with #1c2847 Navy Header
// 3. Batch Action Buttons (Renew, Suspand, Activite)
// 4. Pagination (< 1 2 3 >)
// ==============================================================================
interface LicenseTableProps {
  licenses: License[];
  allFilteredCount: number;
  totalFleetDisplay: string;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedOrg: string;
  onOrgChange: (val: string) => void;
  selectedType: string;
  onTypeChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  onResetFilters: () => void;
  onOpenCreate: () => void;
  onSelectRow: (license: License) => void;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onRenewSelected: () => void;
  onSuspendSelected: () => void;
  onActivateSelected: () => void;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onShowToast: (msg: string) => void;
}

export const LicenseTable: React.FC<LicenseTableProps> = ({
  licenses,
  allFilteredCount,
  totalFleetDisplay,
  searchTerm,
  onSearchChange,
  selectedOrg,
  onOrgChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
  onOpenCreate,
  onSelectRow,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onRenewSelected,
  onSuspendSelected,
  onActivateSelected,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onShowToast
}) => {
  const hasActiveFilters = Boolean(searchTerm || selectedOrg !== 'ALL' || selectedType !== 'ALL' || selectedStatus !== 'ALL');
  
  const allVisibleSelected = licenses.length > 0 && licenses.every(l => selectedIds.has(l.id));
  const someVisibleSelected = licenses.some(l => selectedIds.has(l.id));
  const selectedCount = selectedIds.size;

  const startIndex = allFilteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, allFilteredCount);

  // Helper for Status Badge Pill
  const renderStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'active') {
      return (
        <span className="badge-status badge-active">
          <span className="badge-dot w-1.5 h-1.5 rounded-full" />
          <span>Active</span>
        </span>
      );
    }
    if (s === 'expiring') {
      return (
        <span className="badge-status badge-expiring">
          <span className="badge-dot w-1.5 h-1.5 rounded-full" />
          <span>Expiring</span>
        </span>
      );
    }
    if (s === 'rejected' || s === 'suspended') {
      return (
        <span className="badge-status badge-rejected">
          <span className="badge-dot w-1.5 h-1.5 rounded-full" />
          <span>{status}</span>
        </span>
      );
    }
    return (
      <span className="badge-status badge-expired">
        <span className="badge-dot w-1.5 h-1.5 rounded-full" />
        <span>{status}</span>
      </span>
    );
  };

  return (
    <div>
      {/* ---------------------------------------------------------------------- */}
      {/* 1. FILTER & ACTION CONTROLS TOOLBAR                                    */}
      {/* ---------------------------------------------------------------------- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
        
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Box */}
          <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <SearchIcon sx={{ fontSize: 18 }} />
            </span>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-2xs"
            />
          </div>

          {/* Organization Dropdown */}
          <div className="relative">
            <select 
              value={selectedOrg}
              onChange={(e) => onOrgChange(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
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

          {/* License Type Dropdown */}
          <div className="relative">
            <select 
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
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

          {/* Status Dropdown */}
          <div className="relative">
            <select 
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
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
              onClick={onResetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Create License Button */}
        <div>
          <button 
            type="button"
            onClick={onOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-xs hover:shadow cursor-pointer"
          >
            <NoteAddOutlinedIcon sx={{ fontSize: 18 }} />
            <span>Create License</span>
          </button>
        </div>

      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 2. THE DATA TABLE (Navy Header #1c2847)                                */}
      {/* ---------------------------------------------------------------------- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden mb-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            <thead className="table-header-navy text-white text-[11px] font-semibold uppercase tracking-wider select-none">
              <tr>
                <th scope="col" className="py-3.5 pl-5 pr-3 w-12 text-center">
                  <Checkbox
                    size="small"
                    checked={allVisibleSelected}
                    indeterminate={!allVisibleSelected && someVisibleSelected}
                    onChange={onToggleSelectAll}
                    sx={{ color: '#64748b', p: 0, '&.Mui-checked': { color: '#3b82f6' }, '&.MuiCheckbox-indeterminate': { color: '#3b82f6' } }}
                  />
                </th>
                <th scope="col" className="py-3.5 px-4">LICENSE KEY</th>
                <th scope="col" className="py-3.5 px-4">ORGANIZATION PLAN</th>
                <th scope="col" className="py-3.5 px-4">LICENSE TYPE</th>
                <th scope="col" className="py-3.5 px-4">EXPIRY DATE</th>
                <th scope="col" className="py-3.5 px-4 text-center">LICENSE STATUS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {licenses.map(lic => {
                const isSelected = selectedIds.has(lic.id);
                return (
                  <tr
                    key={lic.id}
                    onClick={() => onSelectRow(lic)}
                    className={`border-b border-slate-100 hover:bg-slate-50/80 transition group cursor-pointer ${
                      isSelected ? 'bg-blue-50/40' : 'bg-white'
                    }`}
                  >
                    {/* Checkbox */}
                    <td 
                      className="py-4 pl-5 pr-3 w-12 text-center align-middle"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        size="small"
                        checked={isSelected}
                        onChange={() => onToggleSelect(lic.id)}
                        sx={{ color: '#cbd5e1', p: 0, '&.Mui-checked': { color: '#2563eb' } }}
                      />
                    </td>

                    {/* License Key */}
                    <td className="py-4 px-4 align-middle">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium text-slate-900 group-hover:text-blue-600 transition">
                          {lic.key}
                        </span>
                        <Tooltip title="Copy Key" arrow>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(lic.key);
                              onShowToast(`Copied ${lic.key} to clipboard!`);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                          >
                            <ContentCopyIcon sx={{ fontSize: 14 }} />
                          </button>
                        </Tooltip>
                      </div>
                    </td>

                    {/* Organization Plan */}
                    <td className="py-4 px-4 align-middle">
                      <div className="font-bold text-slate-900 text-[13px] leading-tight">{lic.plan}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{lic.seats} Seats</div>
                    </td>

                    {/* License Type / Organization */}
                    <td className="py-4 px-4 align-middle text-slate-700 font-medium text-[13px]">
                      {lic.organization}
                    </td>

                    {/* Expiry Date */}
                    <td className="py-4 px-4 align-middle text-slate-700 text-[13px] whitespace-nowrap">
                      {lic.expiryDate}
                    </td>

                    {/* Status Pill Badge */}
                    <td className="py-4 px-4 align-middle text-center">
                      {renderStatusBadge(lic.status)}
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>

        {/* Empty state */}
        {licenses.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">
            No matching licenses found.
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* 3. BATCH ACTIONS & PAGINATION BAR                                      */}
      {/* ---------------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
        
        {/* Outlined Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-start flex-wrap">
          <button 
            type="button" 
            onClick={onRenewSelected}
            disabled={selectedCount === 0}
            className="btn-action-outline"
            title="Extend expiry date for selected licenses by 1 year"
          >
            <AutorenewIcon sx={{ fontSize: 16 }} />
            <span>Renew</span>
          </button>

          <button 
            type="button" 
            onClick={onSuspendSelected}
            disabled={selectedCount === 0}
            className="btn-action-outline"
            title="Suspend selected licenses"
          >
            <PauseCircleOutlineIcon sx={{ fontSize: 16 }} />
            <span>Suspand</span>
          </button>

          <button 
            type="button" 
            onClick={onActivateSelected}
            disabled={selectedCount === 0}
            className="btn-action-outline"
            title="Reactivate selected licenses"
          >
            <PlayCircleOutlineIcon sx={{ fontSize: 16 }} />
            <span>Activite</span>
          </button>

          {selectedCount > 0 && (
            <span className="text-xs text-slate-500 font-medium ml-1">
              {selectedCount} selected
            </span>
          )}
        </div>

        {/* Dynamic Pagination */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="text-xs text-slate-500 font-medium">
            Showing {startIndex} to {endIndex} of {totalFleetDisplay} entries
          </div>

          <nav className="inline-flex items-center gap-1 select-none">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className={`w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-medium text-slate-500 hover:bg-slate-50 transition ${
                currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <ChevronLeftIcon sx={{ fontSize: 16 }} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                  p === currentPage
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'border border-slate-200 text-slate-700 hover:bg-slate-50 bg-white'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className={`w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-medium text-slate-500 hover:bg-slate-50 transition ${
                currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <ChevronRightIcon sx={{ fontSize: 16 }} />
            </button>
          </nav>
        </div>

      </div>

    </div>
  );
};
