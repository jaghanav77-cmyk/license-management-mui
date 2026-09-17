// ==============================================================================
// Simple, clean TypeScript definitions for the License Management System
// Anyone can easily read and extend this file!
// ==============================================================================

export type LicenseStatus = 'Active' | 'Expiring' | 'Rejected' | 'Suspended' | 'Expired';
export type LicensePlan = 'Standard' | 'Enterprise' | 'Pro' | 'Starter';

export interface License {
  id: string;
  key: string;
  plan: LicensePlan;
  seats: number;
  organization: string;
  expiryDate: string;
  status: LicenseStatus;
  createdDate: string;
  adminEmail: string;
  utilization: number;
}
