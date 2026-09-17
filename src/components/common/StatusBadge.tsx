import React from 'react';
import { LicenseStatus } from '../../types/license';

interface StatusBadgeProps {
  status: LicenseStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
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

  if (s === 'rejected') {
    return (
      <span className="badge-status badge-rejected">
        <span className="badge-dot w-1.5 h-1.5 rounded-full" />
        <span>Rejected</span>
      </span>
    );
  }

  if (s === 'suspended') {
    return (
      <span className="badge-status badge-suspended">
        <span className="badge-dot w-1.5 h-1.5 rounded-full" />
        <span>Suspended</span>
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
