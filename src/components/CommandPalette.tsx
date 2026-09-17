import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import SearchIcon from '@mui/icons-material/Search';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { License } from '../types';

// ==============================================================================
// CommandPalette Component
// Opened by typing Ctrl+K or clicking the search box in the header
// ==============================================================================
interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  licenses: License[];
  onSelectLicense: (lic: License) => void;
  onOpenCreate: () => void;
  onExportCsv: () => void;
  onFilterStatus: (status: string) => void;
  onResetFilters: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  open,
  onClose,
  licenses,
  onSelectLicense,
  onOpenCreate,
  onExportCsv,
  onFilterStatus,
  onResetFilters
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  const q = query.trim().toLowerCase();
  const matching = licenses.filter(l =>
    !q || l.key.toLowerCase().includes(q) || l.organization.toLowerCase().includes(q) || l.plan.toLowerCase().includes(q)
  ).slice(0, 5);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: '18px', overflow: 'hidden', mt: -10, boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }
      }}
    >
      {/* Search Input */}
      <div className="relative flex items-center px-4 border-b border-slate-100">
        <SearchIcon sx={{ fontSize: 20, color: '#94a3b8', mr: 1.5 }} />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command or search licenses..."
          className="h-14 w-full border-0 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
        />
        <kbd className="text-[10px] font-mono text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">
          ESC
        </kbd>
      </div>

      <div className="max-h-80 overflow-y-auto p-2 text-sm text-slate-700 space-y-1">
        {/* Results */}
        {query && (
          <div>
            <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Matching Licenses
            </div>
            {matching.length === 0 ? (
              <div className="px-3 py-2 text-xs text-slate-400">No matching licenses found</div>
            ) : (
              matching.map(lic => (
                <div
                  key={lic.id}
                  onClick={() => {
                    onClose();
                    onSelectLicense(lic);
                  }}
                  className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between cursor-pointer transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-800">{lic.key}</span>
                    <span className="text-xs text-slate-500">• {lic.organization} ({lic.plan})</span>
                  </div>
                  <span className="text-xs text-slate-400">{lic.status}</span>
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
            <NoteAddOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Create New License</span>
          </div>

          <div
            onClick={() => { onClose(); onExportCsv(); }}
            className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-700 transition"
          >
            <DownloadOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Export Report (CSV)</span>
          </div>

          <div
            onClick={() => { onClose(); onFilterStatus('Active'); }}
            className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-700 transition"
          >
            <FilterAltOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Show Active Licenses Only</span>
          </div>

          <div
            onClick={() => { onClose(); onFilterStatus('Expiring'); }}
            className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-700 transition"
          >
            <FilterAltOutlinedIcon sx={{ fontSize: 16 }} />
            <span>Show Expiring Licenses Only</span>
          </div>

          <div
            onClick={() => { onClose(); onResetFilters(); }}
            className="px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-700 transition"
          >
            <AutorenewIcon sx={{ fontSize: 16 }} />
            <span>Reset All Filters</span>
          </div>
        </div>

      </div>
    </Dialog>
  );
};
