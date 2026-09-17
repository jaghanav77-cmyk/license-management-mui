import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import SearchIcon from '@mui/icons-material/Search';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useLicense } from '../../context/LicenseContext';
import { StatusBadge } from '../common/StatusBadge';
import { exportLicensesToCsv } from '../../utils/exportCsv';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onOpenCreate: () => void;
  onSelectLicense: (id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  onOpenCreate,
  onSelectLicense
}) => {
  const { licenses, filteredLicenses, setFilter, resetFilters, showToast } = useLicense();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) {
      setQuery('');
    }
  }, [open]);

  const q = query.trim().toLowerCase();

  const matchingLicenses = licenses.filter(lic =>
    !q || lic.key.toLowerCase().includes(q) || lic.organization.toLowerCase().includes(q) || lic.plan.toLowerCase().includes(q)
  ).slice(0, 5);

  const handleExport = () => {
    onClose();
    const ok = exportLicensesToCsv(filteredLicenses);
    if (ok) showToast(`Exported ${filteredLicenses.length} licenses to CSV.`, 'success');
  };

  const handleFilter = (status: string) => {
    onClose();
    setFilter('status', status);
    showToast(`Filtered by ${status}`, 'info');
  };

  const handleReset = () => {
    onClose();
    resetFilters();
    showToast('Filters reset', 'info');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: '18px', 
          overflow: 'hidden',
          mt: -10,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }
      }}
    >
      {/* Search Input Bar */}
      <div className="relative flex items-center px-4 border-b border-slate-100">
        <SearchIcon sx={{ fontSize: 20, color: '#94a3b8', mr: 1.5 }} />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command or search anything..."
          className="h-14 w-full border-0 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
        />
        <kbd className="text-[10px] font-mono text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">
          ESC
        </kbd>
      </div>

      <div className="max-h-80 overflow-y-auto p-2 text-sm text-slate-700 space-y-1">
        
        {/* Matching Licenses */}
        {query && (
          <div>
            <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Matching Licenses
            </div>
            {matchingLicenses.length === 0 ? (
              <div className="px-3 py-2 text-xs text-slate-400">No matching licenses found</div>
            ) : (
              matchingLicenses.map(lic => (
                <div
                  key={lic.id}
                  onClick={() => {
                    onClose();
                    onSelectLicense(lic.id);
                  }}
                  className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between cursor-pointer transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-800">{lic.key}</span>
                    <span className="text-xs text-slate-500">• {lic.organization} ({lic.plan})</span>
                  </div>
                  <StatusBadge status={lic.status} />
                </div>
              ))
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Quick Actions
          </div>
          
          <div
            onClick={() => { onClose(); onOpenCreate(); }}
            className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-700 transition"
          >
            <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-slate-600">
              <NoteAddOutlinedIcon sx={{ fontSize: 13 }} />
            </div>
            <span>Provision New License</span>
          </div>

          <div
            onClick={handleExport}
            className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-700 transition"
          >
            <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-slate-600">
              <DownloadOutlinedIcon sx={{ fontSize: 13 }} />
            </div>
            <span>Export License Fleet (CSV)</span>
          </div>

          <div
            onClick={() => handleFilter('Active')}
            className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-700 transition"
          >
            <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-slate-600">
              <FilterAltOutlinedIcon sx={{ fontSize: 13 }} />
            </div>
            <span>Filter by Active Licenses</span>
          </div>

          <div
            onClick={() => handleFilter('Expiring')}
            className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-700 transition"
          >
            <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-slate-600">
              <FilterAltOutlinedIcon sx={{ fontSize: 13 }} />
            </div>
            <span>Filter by Expiring Licenses</span>
          </div>

          <div
            onClick={handleReset}
            className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-700 transition"
          >
            <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-slate-600">
              <AutorenewIcon sx={{ fontSize: 13 }} />
            </div>
            <span>Reset All Table Filters</span>
          </div>

        </div>

      </div>
    </Dialog>
  );
};
