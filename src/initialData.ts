import { License } from './types';

// ==============================================================================
// Default Sample Data (Matches the reference screenshot exactly)
// You can edit, add, or delete rows here directly!
// ==============================================================================
export const INITIAL_LICENSES: License[] = [
  {
    id: 'lic-1',
    key: 'LIC-4421-MNPR',
    plan: 'Standard',
    seats: 50,
    organization: '123 Inc',
    expiryDate: 'Nov 02, 2024',
    status: 'Active',
    createdDate: 'Nov 02, 2023',
    adminEmail: 'alex.morgan@123inc.com',
    utilization: 42
  },
  {
    id: 'lic-2',
    key: 'LIC-4421-MNPR',
    plan: 'Standard',
    seats: 50,
    organization: '123 Inc',
    expiryDate: 'Nov 02, 2024',
    status: 'Expiring',
    createdDate: 'Nov 02, 2023',
    adminEmail: 'sarah.j@123inc.com',
    utilization: 48
  },
  {
    id: 'lic-3',
    key: 'LIC-4421-MNPR',
    plan: 'Standard',
    seats: 50,
    organization: '123 Inc',
    expiryDate: 'Nov 02, 2024',
    status: 'Expiring',
    createdDate: 'Nov 02, 2023',
    adminEmail: 'david.b@123inc.com',
    utilization: 50
  },
  {
    id: 'lic-4',
    key: 'LIC-4421-MNPR',
    plan: 'Standard',
    seats: 50,
    organization: '123 Inc',
    expiryDate: 'Nov 02, 2024',
    status: 'Rejected',
    createdDate: 'Nov 02, 2023',
    adminEmail: 'compliance@123inc.com',
    utilization: 0
  },
  {
    id: 'lic-5',
    key: 'LIC-4425-PLMN',
    plan: 'Enterprise',
    seats: 250,
    organization: 'Acme Corp',
    expiryDate: 'Dec 15, 2024',
    status: 'Active',
    createdDate: 'Dec 15, 2023',
    adminEmail: 'admin@acmecorp.io',
    utilization: 218
  },
  {
    id: 'lic-6',
    key: 'LIC-4426-TYUI',
    plan: 'Pro',
    seats: 100,
    organization: 'TechNova',
    expiryDate: 'Oct 19, 2024',
    status: 'Suspended',
    createdDate: 'Oct 19, 2023',
    adminEmail: 'ops@technova.dev',
    utilization: 0
  },
  {
    id: 'lic-7',
    key: 'LIC-4427-VBXZ',
    plan: 'Enterprise',
    seats: 500,
    organization: 'Starlight Systems',
    expiryDate: 'Jan 10, 2025',
    status: 'Active',
    createdDate: 'Jan 10, 2024',
    adminEmail: 'security@starlight.com',
    utilization: 480
  },
  {
    id: 'lic-8',
    key: 'LIC-4428-RTYU',
    plan: 'Standard',
    seats: 25,
    organization: 'Nexus Cloud',
    expiryDate: 'Sep 30, 2024',
    status: 'Expiring',
    createdDate: 'Sep 30, 2023',
    adminEmail: 'it@nexuscloud.net',
    utilization: 24
  },
  {
    id: 'lic-9',
    key: 'LIC-4429-POIU',
    plan: 'Starter',
    seats: 10,
    organization: 'Horizon AI',
    expiryDate: 'Nov 25, 2024',
    status: 'Active',
    createdDate: 'Nov 25, 2023',
    adminEmail: 'contact@horizon.ai',
    utilization: 9
  },
  {
    id: 'lic-10',
    key: 'LIC-4430-LKJH',
    plan: 'Pro',
    seats: 150,
    organization: 'CyberPeak',
    expiryDate: 'Aug 14, 2024',
    status: 'Rejected',
    createdDate: 'Aug 14, 2023',
    adminEmail: 'ciso@cyberpeak.security',
    utilization: 0
  }
];
