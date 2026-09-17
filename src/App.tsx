import React, { useState, useEffect, useMemo } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

// Types & Data
import { License } from './types';
import { INITIAL_LICENSES } from './initialData';

// User-friendly components (All located in ./components/)
import { Header } from './components/Header';
import { KpiCards } from './components/KpiCards';
import { LicenseTable } from './components/LicenseTable';
import { CreateLicenseModal } from './components/CreateLicenseModal';
import { LicenseDetailsDrawer } from './components/LicenseDetailsDrawer';
import { CommandPalette } from './components/CommandPalette';
import { SettingsModal } from './components/SettingsModal';

// ==============================================================================
// Main Application Component
// Designed to be very simple, clean, and easy for any developer to understand!
// ==============================================================================
export const App: React.FC = () => {
  // 1. Core State
  const [licenses, setLicenses] = useState<License[]>(() => {
    try {
      const saved = localStorage.getItem('stackly_licenses_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('LocalStorage load error:', e);
    }
    return INITIAL_LICENSES;
  });

  // Save to localStorage automatically when data changes
  useEffect(() => {
    localStorage.setItem('stackly_licenses_data', JSON.stringify(licenses));
  }, [licenses]);

  // 2. Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // 3. Selection & Pagination State
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // 4. Modals & Drawers State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [drawerLicense, setDrawerLicense] = useState<License | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 5. Toast Notification State
  const [toast, setToast] = useState<{ message: string; severity: 'success' | 'info' | 'warning' } | null>(null);
  const showToast = (message: string, severity: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, severity });
  };

  // Keyboard shortcut: Ctrl+K / Cmd+K opens Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 6. Filter Logic
  const filteredLicenses = useMemo(() => {
    return licenses.filter(lic => {
      // Text search
      if (searchTerm.trim()) {
        const q = searchTerm.trim().toLowerCase();
        const matchesKey = lic.key.toLowerCase().includes(q);
        const matchesOrg = lic.organization.toLowerCase().includes(q);
        const matchesPlan = lic.plan.toLowerCase().includes(q);
        const matchesSeats = `${lic.seats} seats`.toLowerCase().includes(q);
        const matchesStatus = lic.status.toLowerCase().includes(q);
        if (!matchesKey && !matchesOrg && !matchesPlan && !matchesSeats && !matchesStatus) return false;
      }

      // Organization filter
      if (selectedOrg !== 'ALL' && lic.organization.toLowerCase() !== selectedOrg.toLowerCase()) {
        return false;
      }

      // License Type filter
      if (selectedType !== 'ALL' && lic.plan.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'ALL') {
        const fs = selectedStatus.toLowerCase();
        const rs = lic.status.toLowerCase();
        if (fs === 'active' && rs !== 'active') return false;
        if (fs === 'expiring' && rs !== 'expiring') return false;
        if ((fs === 'suspended' || fs === 'rejected') && rs !== 'suspended' && rs !== 'rejected') return false;
        if (fs === 'expired' && rs !== 'expired' && rs !== 'expiring') return false;
      }

      return true;
    });
  }, [licenses, searchTerm, selectedOrg, selectedType, selectedStatus]);

  // 7. Pagination Logic
  const totalFilteredCount = filteredLicenses.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / pageSize));

  // Reset page to 1 if search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedOrg, selectedType, selectedStatus]);

  const paginatedLicenses = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLicenses.slice(start, start + pageSize);
  }, [filteredLicenses, currentPage, pageSize]);

  // 8. Fleet KPI Counters (Tied to reference layout figures: 2,458 / 2,104 / 142 / 36)
  const kpiStats = useMemo(() => {
    const base = { total: 2458, active: 2104, expired: 142, suspended: 36 };
    const customDelta = licenses.length - INITIAL_LICENSES.length;
    const activeCount = licenses.filter(l => l.status === 'Active').length;
    const expiredCount = licenses.filter(l => l.status === 'Expiring' || l.status === 'Expired').length;
    const suspendedCount = licenses.filter(l => l.status === 'Suspended' || l.status === 'Rejected').length;

    const defActive = INITIAL_LICENSES.filter(l => l.status === 'Active').length;
    const defExpired = INITIAL_LICENSES.filter(l => l.status === 'Expiring' || l.status === 'Expired').length;
    const defSuspended = INITIAL_LICENSES.filter(l => l.status === 'Suspended' || l.status === 'Rejected').length;

    return {
      total: (base.total + customDelta).toLocaleString(),
      active: (base.active + (activeCount - defActive)).toLocaleString(),
      expired: (base.expired + (expiredCount - defExpired)).toLocaleString(),
      suspended: (base.suspended + (suspendedCount - defSuspended)).toLocaleString(),
    };
  }, [licenses]);

  // 9. Handlers for Actions
  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleSelectAll = () => {
    const visibleIds = paginatedLicenses.map(l => l.id);
    const allSelected = visibleIds.length > 0 && visibleIds.every(id => selectedIds.has(id));
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (allSelected) {
        visibleIds.forEach(id => next.delete(id));
      } else {
        visibleIds.forEach(id => next.add(id));
      }
      return next;
    });
  };

  const handleRenewSelected = () => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const formatted = nextYear.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    let count = 0;
    setLicenses(prev => prev.map(lic => {
      if (selectedIds.has(lic.id)) {
        count++;
        return { ...lic, status: 'Active', expiryDate: formatted };
      }
      return lic;
    }));
    showToast(`Successfully renewed ${count} license${count > 1 ? 's' : ''}!`);
  };

  const handleSuspendSelected = () => {
    let count = 0;
    setLicenses(prev => prev.map(lic => {
      if (selectedIds.has(lic.id)) {
        count++;
        return { ...lic, status: 'Suspended' };
      }
      return lic;
    }));
    showToast(`Suspended ${count} license${count > 1 ? 's' : ''}.`, 'warning');
  };

  const handleActivateSelected = () => {
    let count = 0;
    setLicenses(prev => prev.map(lic => {
      if (selectedIds.has(lic.id)) {
        count++;
        return { ...lic, status: 'Active' };
      }
      return lic;
    }));
    showToast(`Activated ${count} license${count > 1 ? 's' : ''}!`);
  };

  const handleCreateLicense = (newLic: License) => {
    setLicenses(prev => [newLic, ...prev]);
    showToast(`Issued license ${newLic.key} for ${newLic.organization}!`);
  };

  const handleRenewSingle = (id: string) => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const formatted = nextYear.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    setLicenses(prev => prev.map(l => l.id === id ? { ...l, status: 'Active', expiryDate: formatted } : l));
    setDrawerLicense(prev => prev && prev.id === id ? { ...prev, status: 'Active', expiryDate: formatted } : prev);
    showToast('License extended by +1 year!');
  };

  const handleToggleStatusSingle = (id: string) => {
    setLicenses(prev => prev.map(l => {
      if (l.id === id) {
        const nextStatus = l.status === 'Active' ? 'Suspended' : 'Active';
        return { ...l, status: nextStatus };
      }
      return l;
    }));
    setDrawerLicense(prev => {
      if (!prev || prev.id !== id) return prev;
      return { ...prev, status: prev.status === 'Active' ? 'Suspended' : 'Active' };
    });
    showToast('License status updated');
  };

  const handleDeleteSingle = (id: string) => {
    setLicenses(prev => prev.filter(l => l.id !== id));
    showToast('License revoked and deleted', 'warning');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedOrg('ALL');
    setSelectedType('ALL');
    setSelectedStatus('ALL');
    showToast('Filters reset', 'info');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('License status synchronized with platform telemetry.');
    }, 800);
  };

  const handleExportCsv = () => {
    if (filteredLicenses.length === 0) {
      showToast('No licenses available to export', 'warning');
      return;
    }
    const headers = ['License Key', 'Plan Tier', 'Seats Quota', 'Organization', 'Expiry Date', 'Status', 'Admin Email'];
    const rows = filteredLicenses.map(l => [
      `"${l.key}"`, `"${l.plan}"`, l.seats, `"${l.organization}"`, `"${l.expiryDate}"`, `"${l.status}"`, `"${l.adminEmail}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `licenses_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredLicenses.length} licenses to CSV.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans">
      
      {/* 1. Header Navigation Bar */}
      <Header
        onOpenSearch={() => setIsCommandPaletteOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onShowToast={(msg) => showToast(msg, 'info')}
      />

      {/* 2. Main Page Content */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-7">
        
        {/* Title & Subtitle */}
        <div className="mb-7">
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight leading-snug">
            License Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage platform licenses across organizations and tenants
          </p>
        </div>

        {/* 4 Top KPI Cards */}
        <KpiCards
          activeFilter={selectedStatus}
          onFilterChange={(st) => setSelectedStatus(st)}
          totalCount={kpiStats.total}
          activeCount={kpiStats.active}
          expiredCount={kpiStats.expired}
          suspendedCount={kpiStats.suspended}
        />

        {/* Section Header */}
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900">License List</h2>
        </div>

        {/* Table + Filter Bar + Batch Actions + Pagination */}
        <LicenseTable
          licenses={paginatedLicenses}
          allFilteredCount={totalFilteredCount}
          totalFleetDisplay={kpiStats.total}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedOrg={selectedOrg}
          onOrgChange={setSelectedOrg}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onResetFilters={handleResetFilters}
          onOpenCreate={() => setIsCreateOpen(true)}
          onSelectRow={(lic) => setDrawerLicense(lic)}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
          onRenewSelected={handleRenewSelected}
          onSuspendSelected={handleSuspendSelected}
          onActivateSelected={handleActivateSelected}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onShowToast={(msg) => showToast(msg)}
        />

        {/* Page Action Footer (Refresh & Export) */}
        <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-sm font-medium transition shadow-2xs cursor-pointer"
          >
            <span className={isRefreshing ? 'spinning inline-flex' : 'inline-flex'}>
              <AutorenewIcon sx={{ fontSize: 18, color: '#64748b' }} />
            </span>
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-xs hover:shadow cursor-pointer"
          >
            <FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />
            <span>Export report</span>
          </button>
        </div>

      </main>

      {/* 3. Modals & Drawers */}
      <CreateLicenseModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateLicense}
        onShowToast={showToast}
      />

      <LicenseDetailsDrawer
        license={drawerLicense}
        open={Boolean(drawerLicense)}
        onClose={() => setDrawerLicense(null)}
        onRenew={handleRenewSingle}
        onToggleStatus={handleToggleStatusSingle}
        onDelete={handleDeleteSingle}
        onShowToast={showToast}
      />

      <CommandPalette
        open={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        licenses={licenses}
        onSelectLicense={(lic) => setDrawerLicense(lic)}
        onOpenCreate={() => setIsCreateOpen(true)}
        onExportCsv={handleExportCsv}
        onFilterStatus={(st) => setSelectedStatus(st)}
        onResetFilters={handleResetFilters}
      />

      <SettingsModal
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetData={() => {
          setLicenses(INITIAL_LICENSES);
          setSelectedIds(new Set());
          handleResetFilters();
          showToast('Sample license fleet data restored');
        }}
      />

      {/* 4. Global Toast Notification */}
      {toast && (
        <Snackbar
          open={Boolean(toast)}
          autoHideDuration={3500}
          onClose={() => setToast(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={() => setToast(null)} 
            severity={toast.severity} 
            variant="filled"
            sx={{ borderRadius: '10px', fontWeight: 500 }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      )}

    </div>
  );
};

export default App;
