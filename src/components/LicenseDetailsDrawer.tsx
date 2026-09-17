import React from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { License } from '../types';

// ==============================================================================
// LicenseDetailsDrawer Component
// Slide-over inspection drawer that opens when any license row is clicked!
// ==============================================================================
interface LicenseDetailsDrawerProps {
  license: License | null;
  open: boolean;
  onClose: () => void;
  onRenew: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const LicenseDetailsDrawer: React.FC<LicenseDetailsDrawerProps> = ({
  license,
  open,
  onClose,
  onRenew,
  onToggleStatus,
  onDelete,
  onShowToast
}) => {
  if (!license) return null;

  const used = license.utilization || Math.floor(license.seats * 0.85);
  const percent = Math.min(100, Math.round((used / license.seats) * 100));
  const secretKey = `sec_live_${license.id.replace(/[^a-z0-9]/g, '')}_token`;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 440 }, display: 'flex', flexDirection: 'column' }
      }}
    >
      {/* Drawer Header */}
      <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">License Inspection</span>
            <span className={`badge-status ${license.status === 'Active' ? 'badge-active' : license.status === 'Expiring' ? 'badge-expiring' : 'badge-rejected'}`}>
              <span className="badge-dot w-1.5 h-1.5 rounded-full" />
              <span>{license.status}</span>
            </span>
          </div>
          <h2 className="text-lg font-bold mt-1 font-mono">{license.key}</h2>
        </div>
        <button 
          type="button" 
          onClick={onClose} 
          className="text-slate-400 hover:text-white transition cursor-pointer"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Info Grid */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-500 font-medium block">Organization</span>
            <span className="text-slate-900 font-bold text-sm mt-0.5 block">{license.organization}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium block">Plan Tier</span>
            <span className="text-slate-900 font-bold text-sm mt-0.5 block">{license.plan}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium block">Expiry Date</span>
            <span className="text-slate-900 font-semibold mt-0.5 block">{license.expiryDate}</span>
          </div>
          <div>
            <span className="text-slate-500 font-medium block">Created Date</span>
            <span className="text-slate-900 font-semibold mt-0.5 block">{license.createdDate}</span>
          </div>
        </div>

        {/* Seat Utilization Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-700">Seat Utilization</span>
            <span className="text-slate-500">{used} / {license.seats} seats ({percent}%)</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
          </div>
        </div>

        {/* Tenant Administrator */}
        <div className="text-xs">
          <span className="font-semibold text-slate-700 block mb-1">Assigned Tenant Administrator</span>
          <div className="flex items-center gap-2.5 p-3 bg-white border border-slate-200 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              @
            </div>
            <div className="truncate">
              <span className="font-medium text-slate-800 block truncate">{license.adminEmail}</span>
              <span className="text-[11px] text-slate-400">Primary Tenant Contact</span>
            </div>
          </div>
        </div>

        {/* Client Secret */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-slate-700">Client Secret Token</span>
            <button 
              type="button" 
              onClick={() => {
                navigator.clipboard.writeText(secretKey);
                onShowToast('Client Secret copied to clipboard!');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <ContentCopyIcon sx={{ fontSize: 12 }} />
              <span>Copy</span>
            </button>
          </div>
          <div className="p-2.5 bg-slate-100 rounded-lg font-mono text-xs text-slate-600 break-all border border-slate-200">
            {secretKey}
          </div>
        </div>

        {/* Drawer Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
          <button 
            type="button" 
            onClick={() => onRenew(license.id)}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition inline-flex items-center justify-center gap-1 cursor-pointer"
          >
            <AutorenewIcon sx={{ fontSize: 16 }} />
            <span>Renew This License (+1 Year)</span>
          </button>
          
          <div className="grid grid-cols-2 gap-2">
            <button 
              type="button" 
              onClick={() => onToggleStatus(license.id)}
              className="py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition cursor-pointer"
            >
              Toggle Suspend/Active
            </button>
            <button 
              type="button" 
              onClick={() => {
                if (window.confirm(`Revoke license ${license.key}?`)) {
                  onDelete(license.id);
                  onClose();
                }
              }}
              className="py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-xs font-medium transition cursor-pointer"
            >
              Revoke & Delete
            </button>
          </div>
        </div>

      </div>
    </Drawer>
  );
};
