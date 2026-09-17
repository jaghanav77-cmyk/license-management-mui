export type LicenseStatus = 'Active' | 'Expiring' | 'Rejected' | 'Suspended' | 'Expired';
export type LicensePlan = 'Standard' | 'Enterprise' | 'Pro' | 'Starter';

export interface LicenseItem {
  id: string;
  key: string;
  plan: LicensePlan;
  seats: number;
  organization: string;
  expiryDate: string;
  status: LicenseStatus;
  createdDate: string;
  tier: string;
  adminEmail: string;
  utilization: number;
  environment: 'Production' | 'Staging' | 'Sandbox' | 'Development';
}

export interface FleetMetrics {
  total: string;
  active: string;
  expired: string;
  suspended: string;
  utilizationRate: string;
}

export interface LicenseFilters {
  search: string;
  organization: string;
  licenseType: string;
  status: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: 'warning' | 'danger' | 'success';
}

export interface ToastMessage {
  id: string;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}
