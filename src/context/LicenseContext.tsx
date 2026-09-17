import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { LicenseItem, LicenseFilters, FleetMetrics, NotificationItem, ToastMessage, LicenseStatus } from '../types/license';

const STORAGE_KEY = 'stackly_license_management_data_react_v1';

const DEFAULT_LICENSES: LicenseItem[] = [
  {
    id: 'lic-1',
    key: 'LIC-4421-MNPR',
    plan: 'Standard',
    seats: 50,
    organization: '123 Inc',
    expiryDate: 'Nov 02, 2024',
    status: 'Active',
    createdDate: 'Nov 02, 2023',
    tier: 'Standard Tier',
    adminEmail: 'alex.morgan@123inc.com',
    utilization: 42,
    environment: 'Production'
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
    tier: 'Standard Tier',
    adminEmail: 'sarah.j@123inc.com',
    utilization: 48,
    environment: 'Production'
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
    tier: 'Standard Tier',
    adminEmail: 'david.b@123inc.com',
    utilization: 50,
    environment: 'Production'
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
    tier: 'Standard Tier',
    adminEmail: 'compliance@123inc.com',
    utilization: 0,
    environment: 'Staging'
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
    tier: 'Enterprise Platinum',
    adminEmail: 'admin@acmecorp.io',
    utilization: 218,
    environment: 'Production'
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
    tier: 'Professional Tier',
    adminEmail: 'ops@technova.dev',
    utilization: 0,
    environment: 'Sandbox'
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
    tier: 'Enterprise Platinum',
    adminEmail: 'security@starlight.com',
    utilization: 480,
    environment: 'Production'
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
    tier: 'Standard Tier',
    adminEmail: 'it@nexuscloud.net',
    utilization: 24,
    environment: 'Production'
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
    tier: 'Starter Tier',
    adminEmail: 'contact@horizon.ai',
    utilization: 9,
    environment: 'Development'
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
    tier: 'Professional Tier',
    adminEmail: 'ciso@cyberpeak.security',
    utilization: 0,
    environment: 'Production'
  }
];

interface LicenseContextType {
  licenses: LicenseItem[];
  filteredLicenses: LicenseItem[];
  paginatedLicenses: LicenseItem[];
  metrics: FleetMetrics;
  filters: LicenseFilters;
  setFilter: (key: keyof LicenseFilters, value: string) => void;
  resetFilters: () => void;
  selectedIds: Set<string>;
  toggleSelect: (id: string) => void;
  toggleSelectAllVisible: () => void;
  clearSelection: () => void;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  setPage: (page: number) => void;
  startIndex: number;
  endIndex: number;
  totalDisplayEntries: string;
  addLicense: (data: Partial<LicenseItem>) => LicenseItem;
  updateLicense: (id: string, updates: Partial<LicenseItem>) => void;
  deleteLicense: (id: string) => void;
  batchRenew: () => number;
  batchSuspend: () => number;
  batchActivate: () => number;
  generateKey: () => string;
  resetFleetToDefault: () => void;
  notifications: NotificationItem[];
  markAllNotificationsRead: () => void;
  toast: ToastMessage | null;
  showToast: (message: string, severity?: ToastMessage['severity']) => void;
  closeToast: () => void;
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined);

export const LicenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [licenses, setLicenses] = useState<LicenseItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not load licenses from localStorage:', e);
    }
    return DEFAULT_LICENSES;
  });

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  const [filters, setFilters] = useState<LicenseFilters>({
    search: '',
    organization: 'ALL',
    licenseType: 'ALL',
    status: 'ALL'
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, title: 'License Expiring Soon', desc: 'LIC-4421-MNPR expires within 30 days', time: '10m ago', unread: true, type: 'warning' },
    { id: 2, title: 'Admin Review Needed', desc: 'Suspended license LIC-4426-TYUI requires review', time: '1h ago', unread: true, type: 'danger' },
    { id: 3, title: 'Renewal Confirmed', desc: 'LIC-4425-PLMN Enterprise tier was approved', time: '4h ago', unread: false, type: 'success' }
  ]);

  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((message: string, severity: ToastMessage['severity'] = 'success') => {
    setToast({
      id: Date.now().toString(),
      message,
      severity
    });
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(licenses));
    } catch (e) {
      console.error('Error saving licenses:', e);
    }
  }, [licenses]);

  const generateKey = useCallback(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const segment = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `LIC-${Math.floor(1000 + Math.random() * 9000)}-${segment(4)}`;
  }, []);

  const setFilter = useCallback((key: keyof LicenseFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      organization: 'ALL',
      licenseType: 'ALL',
      status: 'ALL'
    });
    setCurrentPage(1);
  }, []);

  // Filter calculation
  const filteredLicenses = useMemo(() => {
    return licenses.filter(lic => {
      // Search
      if (filters.search.trim()) {
        const q = filters.search.trim().toLowerCase();
        const matchesKey = lic.key.toLowerCase().includes(q);
        const matchesOrg = lic.organization.toLowerCase().includes(q);
        const matchesPlan = lic.plan.toLowerCase().includes(q);
        const matchesSeats = `${lic.seats} seats`.toLowerCase().includes(q);
        const matchesStatus = lic.status.toLowerCase().includes(q);
        if (!matchesKey && !matchesOrg && !matchesPlan && !matchesSeats && !matchesStatus) return false;
      }

      // Org
      if (filters.organization !== 'ALL' && lic.organization.toLowerCase() !== filters.organization.toLowerCase()) {
        return false;
      }

      // Type / Plan
      if (filters.licenseType !== 'ALL' && lic.plan.toLowerCase() !== filters.licenseType.toLowerCase()) {
        return false;
      }

      // Status
      if (filters.status !== 'ALL') {
        const fs = filters.status.toLowerCase();
        const rs = lic.status.toLowerCase();
        if (fs === 'active' && rs !== 'active') return false;
        if (fs === 'expiring' && rs !== 'expiring') return false;
        if ((fs === 'suspended' || fs === 'rejected') && rs !== 'suspended' && rs !== 'rejected') return false;
        if (fs === 'expired' && rs !== 'expired' && rs !== 'expiring') return false;
      }

      return true;
    });
  }, [licenses, filters]);

  // Pagination calculation
  const totalFiltered = filteredLicenses.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = totalFiltered === 0 ? 0 : (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalFiltered);
  const paginatedLicenses = useMemo(() => {
    return filteredLicenses.slice(startIndex, startIndex + pageSize);
  }, [filteredLicenses, startIndex, pageSize]);

  // Fleet KPI metrics tied to reference anchors (2,458 Total, 2,104 Active, 142 Expired, 36 Suspended)
  const metrics: FleetMetrics = useMemo(() => {
    const base = { total: 2458, active: 2104, expired: 142, suspended: 36 };
    const customDelta = licenses.length - DEFAULT_LICENSES.length;
    const activeCount = licenses.filter(l => l.status === 'Active').length;
    const expiredCount = licenses.filter(l => l.status === 'Expiring' || l.status === 'Expired').length;
    const suspendedCount = licenses.filter(l => l.status === 'Suspended' || l.status === 'Rejected').length;

    const defActive = DEFAULT_LICENSES.filter(l => l.status === 'Active').length;
    const defExpired = DEFAULT_LICENSES.filter(l => l.status === 'Expiring' || l.status === 'Expired').length;
    const defSuspended = DEFAULT_LICENSES.filter(l => l.status === 'Suspended' || l.status === 'Rejected').length;

    return {
      total: (base.total + customDelta).toLocaleString(),
      active: (base.active + (activeCount - defActive)).toLocaleString(),
      expired: (base.expired + (expiredCount - defExpired)).toLocaleString(),
      suspended: (base.suspended + (suspendedCount - defSuspended)).toLocaleString(),
      utilizationRate: '85.6%'
    };
  }, [licenses]);

  const totalDisplayEntries = metrics.total;

  // Selection
  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAllVisible = useCallback(() => {
    const visibleIds = paginatedLicenses.map(l => l.id);
    setSelectedIds(prev => {
      const allSelected = visibleIds.length > 0 && visibleIds.every(id => prev.has(id));
      const next = new Set(prev);
      if (allSelected) {
        visibleIds.forEach(id => next.delete(id));
      } else {
        visibleIds.forEach(id => next.add(id));
      }
      return next;
    });
  }, [paginatedLicenses]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  // CRUD
  const addLicense = useCallback((data: Partial<LicenseItem>): LicenseItem => {
    const newLicense: LicenseItem = {
      id: `lic-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      key: data.key || generateKey(),
      plan: data.plan || 'Standard',
      seats: Number(data.seats) || 50,
      organization: data.organization || '123 Inc',
      expiryDate: data.expiryDate || 'Nov 02, 2025',
      status: (data.status as LicenseStatus) || 'Active',
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      tier: `${data.plan || 'Standard'} Tier`,
      adminEmail: data.adminEmail || `admin@${(data.organization || 'example').toLowerCase().replace(/\s+/g, '')}.com`,
      utilization: 0,
      environment: data.environment || 'Production'
    };

    setLicenses(prev => [newLicense, ...prev]);
    return newLicense;
  }, [generateKey]);

  const updateLicense = useCallback((id: string, updates: Partial<LicenseItem>) => {
    setLicenses(prev => prev.map(lic => (lic.id === id ? { ...lic, ...updates } : lic)));
  }, []);

  const deleteLicense = useCallback((id: string) => {
    setLicenses(prev => prev.filter(lic => lic.id !== id));
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  // Batch actions
  const batchRenew = useCallback(() => {
    if (selectedIds.size === 0) return 0;
    let count = 0;
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const formatted = nextYear.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    setLicenses(prev => prev.map(lic => {
      if (selectedIds.has(lic.id)) {
        count++;
        return { ...lic, status: 'Active', expiryDate: formatted };
      }
      return lic;
    }));
    return count;
  }, [selectedIds]);

  const batchSuspend = useCallback(() => {
    if (selectedIds.size === 0) return 0;
    let count = 0;
    setLicenses(prev => prev.map(lic => {
      if (selectedIds.has(lic.id)) {
        count++;
        return { ...lic, status: 'Suspended' };
      }
      return lic;
    }));
    return count;
  }, [selectedIds]);

  const batchActivate = useCallback(() => {
    if (selectedIds.size === 0) return 0;
    let count = 0;
    setLicenses(prev => prev.map(lic => {
      if (selectedIds.has(lic.id)) {
        count++;
        return { ...lic, status: 'Active' };
      }
      return lic;
    }));
    return count;
  }, [selectedIds]);

  const resetFleetToDefault = useCallback(() => {
    setLicenses(DEFAULT_LICENSES);
    setSelectedIds(new Set());
    resetFilters();
  }, [resetFilters]);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  }, []);

  return (
    <LicenseContext.Provider
      value={{
        licenses,
        filteredLicenses,
        paginatedLicenses,
        metrics,
        filters,
        setFilter,
        resetFilters,
        selectedIds,
        toggleSelect,
        toggleSelectAllVisible,
        clearSelection,
        currentPage,
        totalPages,
        pageSize,
        setPage: setCurrentPage,
        startIndex: totalFiltered === 0 ? 0 : startIndex + 1,
        endIndex,
        totalDisplayEntries,
        addLicense,
        updateLicense,
        deleteLicense,
        batchRenew,
        batchSuspend,
        batchActivate,
        generateKey,
        resetFleetToDefault,
        notifications,
        markAllNotificationsRead,
        toast,
        showToast,
        closeToast
      }}
    >
      {children}
    </LicenseContext.Provider>
  );
};

export const useLicense = () => {
  const context = useContext(LicenseContext);
  if (!context) {
    throw new Error('useLicense must be used within a LicenseProvider');
  }
  return context;
};
