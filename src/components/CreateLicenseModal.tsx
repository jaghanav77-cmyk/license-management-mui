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
import { License, LicensePlan, LicenseStatus } from '../types';

// ==============================================================================
// CreateLicenseModal Component
// Dialog modal to provision a new license.
// Auto-generates unique keys and validates the form inputs!
// ==============================================================================
interface CreateLicenseModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newLicense: License) => void;
  onShowToast: (msg: string) => void;
}

export const CreateLicenseModal: React.FC<CreateLicenseModalProps> = ({
  open,
  onClose,
  onCreate,
  onShowToast
}) => {
  const [org, setOrg] = useState('');
  const [plan, setPlan] = useState<LicensePlan>('Standard');
  const [seats, setSeats] = useState(50);
  const [expiry, setExpiry] = useState('');
  const [status, setStatus] = useState<LicenseStatus>('Active');
  const [adminEmail, setAdminEmail] = useState('');
  const [candidateKey, setCandidateKey] = useState('');

  // Key generator helper
  const makeRandomKey = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const segment = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `LIC-${Math.floor(1000 + Math.random() * 9000)}-${segment(4)}`;
  };

  useEffect(() => {
    if (open) {
      setCandidateKey(makeRandomKey());
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      setExpiry(nextYear.toISOString().split('T')[0]);
      setOrg('');
      setPlan('Standard');
      setSeats(50);
      setStatus('Active');
      setAdminEmail('');
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!org.trim()) {
      onShowToast('Please enter an organization name');
      return;
    }

    const dateObj = new Date(expiry);
    const formattedExpiry = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newLicense: License = {
      id: `lic-${Date.now()}`,
      key: candidateKey,
      organization: org.trim(),
      plan,
      seats,
      expiryDate: formattedExpiry,
      status,
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      adminEmail: adminEmail.trim() || `admin@${org.toLowerCase().replace(/\s+/g, '')}.com`,
      utilization: 0
    };

    onCreate(newLicense);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{ sx: { borderRadius: '18px', overflow: 'hidden' } }}
    >
      {/* Dark Navy Dialog Header */}
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Expiring">Expiring</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Key Preview Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Generated License Key</span>
              <button 
                type="button" 
                onClick={() => {
                  setCandidateKey(makeRandomKey());
                  onShowToast('New key generated');
                }}
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
                onClick={() => {
                  navigator.clipboard.writeText(candidateKey);
                  onShowToast('License key copied!');
                }}
                className="text-xs text-slate-600 hover:text-slate-900 px-2 py-0.5 border border-slate-200 rounded bg-white inline-flex items-center gap-1 cursor-pointer"
              >
                <ContentCopyIcon sx={{ fontSize: 12 }} />
                <span>Copy</span>
              </button>
            </div>
          </div>

          {/* Tenant Contact */}
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
          <Button onClick={onClose} sx={{ color: '#64748b', textTransform: 'none' }}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ bgcolor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8' }, textTransform: 'none', fontWeight: 600, borderRadius: '8px', px: 3 }}
          >
            Issue License
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
