import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';

// ==============================================================================
// SettingsModal Component
// Platform preferences and restore sample fleet data
// ==============================================================================
interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose, onResetData }) => {
  const [autoRenew, setAutoRenew] = useState(true);
  const [overProvision, setOverProvision] = useState(false);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: '18px', p: 1 } }}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
        <DialogTitle sx={{ p: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
          Platform Configuration
        </DialogTitle>
        <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 transition cursor-pointer">
          <CloseIcon sx={{ fontSize: 20 }} />
        </button>
      </div>

      <DialogContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        
        {/* Toggle 1 */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800 text-sm">Auto-Renewal Alerts</p>
            <p className="text-xs text-slate-400">Warn 30 days prior to expiry</p>
          </div>
          <Switch checked={autoRenew} onChange={(e) => setAutoRenew(e.target.checked)} color="primary" />
        </div>

        {/* Toggle 2 */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800 text-sm">Over-provisioning</p>
            <p className="text-xs text-slate-400">Allow seats to exceed 100% quota</p>
          </div>
          <Switch checked={overProvision} onChange={(e) => setOverProvision(e.target.checked)} color="primary" />
        </div>

        {/* Restore Sample Data */}
        <div className="pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              onResetData();
              onClose();
            }}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Restore Default Sample Data
          </button>
        </div>

      </DialogContent>
    </Dialog>
  );
};
