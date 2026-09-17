import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useLicense } from '../../context/LicenseContext';
import { LicensePlan, LicenseStatus } from '../../types/license';

interface CreateLicenseDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateLicenseDialog: React.FC<CreateLicenseDialogProps> = ({ open, onClose }) => {
  const { addLicense, generateKey, showToast } = useLicense();

  const [org, setOrg] = useState('');
  const [plan, setPlan] = useState<LicensePlan>('Standard');
  const [seats, setSeats] = useState<number>(50);
  const [expiry, setExpiry] = useState<string>('');
  const [status, setStatus] = useState<LicenseStatus>('Active');
  const [adminEmail, setAdminEmail] = useState('');
  const [candidateKey, setCandidateKey] = useState('');

  useEffect(() => {
    if (open) {
      setCandidateKey(generateKey());
      const d = new Date();
      d.setFullYear(d.getFullYear() + 1);
      setExpiry(d.toISOString().split('T')[0]);
      setOrg('');
      setPlan('Standard');
      setSeats(50);
      setStatus('Active');
      setAdminEmail('');
    }
  }, [open, generateKey]);

  const handleRegenerateKey = () => {
    const k = generateKey();
    setCandidateKey(k);
    showToast('New license key generated', 'info');
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(candidateKey).then(() => {
      showToast('Key copied to clipboard!', 'success');
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!org.trim()) {
      showToast('Organization name is required', 'warning');
      return;
    }

    const dateObj = new Date(expiry);
    const formattedExpiry = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const created = addLicense({
      key: candidateKey,
      organization: org.trim(),
      plan,
      seats,
      expiryDate: formattedExpiry,
      status,
      adminEmail: adminEmail.trim()
    });

    onClose();
    showToast(`Issued license ${created.key} for ${created.organization}!`, 'success');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: '20px', overflow: 'hidden' }
      }}
    >
      {/* Dark Navy Header */}
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <NoteAddOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
          <DialogTitle sx={{ p: 0, fontSize: '1rem', fontWeight: 600, color: 'inherit' }}>
            Provision New License
          </DialogTitle>
        </div>
        <button type="button" onClick={onClose} className="text-slate-400 hover:text-white transition cursor-pointer">
          <CloseIcon sx={{ fontSize: 20 }} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          
          {/* Organization Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1" htmlFor="org-input">
              Organization Name *
            </label>
            <input 
              id="org-input"
              type="text" 
              required
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              placeholder="e.g. 123 Inc, Acme Corp"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Plan Tier */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1" htmlFor="plan-select">
                Plan Tier *
              </label>
              <select 
                id="plan-select"
                value={plan}
                onChange={(e) => setPlan(e.target.value as LicensePlan)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Standard">Standard</option>
                <option value="Pro">Professional</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Starter">Starter</option>
              </select>
            </div>

            {/* Seat Quota */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1" htmlFor="seats-input">
                Seats Quota *
              </label>
              <input 
                id="seats-input"
                type="number" 
                min="1" 
                max="10000" 
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1" htmlFor="expiry-input">
                Expiry Date *
              </label>
              <input 
                id="expiry-input"
                type="date" 
                required
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Initial Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1" htmlFor="status-select">
                Initial Status
              </label>
              <select 
                id="status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as LicenseStatus)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Active">Active</option>
                <option value="Expiring">Expiring</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Generated Key Preview Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Generated License Key</span>
              <button 
                type="button" 
                onClick={handleRegenerateKey}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 cursor-pointer"
              >
                <AutorenewIcon sx={{ fontSize: 13 }} />
                <span>Regenerate</span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono font-bold text-slate-900">{candidateKey}</code>
              <button 
                type="button" 
                onClick={handleCopyKey}
                className="text-xs text-slate-600 hover:text-slate-900 px-2 py-0.5 border border-slate-200 rounded bg-white inline-flex items-center gap-1 cursor-pointer"
              >
                <ContentCopyIcon sx={{ fontSize: 12 }} />
                <span>Copy</span>
              </button>
            </div>
          </div>

          {/* Tenant Admin Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1" htmlFor="email-input">
              Tenant Admin Email (optional)
            </label>
            <input 
              id="email-input"
              type="email" 
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="admin@organization.com"
              className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid #f1f5f9' }}>
          <Button onClick={onClose} sx={{ color: '#64748b', textTransform: 'none', fontWeight: 500 }}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ 
              bgcolor: '#2563eb', 
              '&:hover': { bgcolor: '#1d4ed8' },
              textTransform: 'none', 
              fontWeight: 600,
              borderRadius: '8px',
              px: 3
            }}
          >
            Issue License
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
