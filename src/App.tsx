import React, { useState, useEffect } from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useLicense } from './context/LicenseContext';
import { Header } from './components/layout/Header';
import { KpiGrid } from './components/kpi/KpiGrid';
import { TableToolbar } from './components/table/TableToolbar';
import { LicenseTable } from './components/table/LicenseTable';
import { BatchActions } from './components/table/BatchActions';
import { Pagination } from './components/table/Pagination';
import { CreateLicenseDialog } from './components/modals/CreateLicenseDialog';
import { LicenseDetailsDrawer } from './components/modals/LicenseDetailsDrawer';
import { CommandPalette } from './components/modals/CommandPalette';
import { SettingsDialog } from './components/modals/SettingsDialog';
import { ToastAlert } from './components/common/ToastAlert';
import { exportLicensesToCsv } from './utils/exportCsv';

export const App: React.FC = () => {
  const { filteredLicenses, showToast } = useLicense();

  // Modals & Drawers state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedDrawerLicenseId, setSelectedDrawerLicenseId] = useState<string | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('License status synchronized with platform telemetry.', 'success');
    }, 800);
  };

  const handleExport = () => {
    const success = exportLicensesToCsv(filteredLicenses);
    if (success) {
      showToast(`Exported ${filteredLicenses.length} licenses to CSV.`, 'success');
    } else {
      showToast('No licenses available to export.', 'warning');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans">
      
      {/* Top Navigation Bar */}
      <Header
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-7">
        
        {/* Page Title & Subtitle */}
        <div className="mb-7">
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight leading-snug">
            License Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage platform licenses across organizations and tenants
          </p>
        </div>

        {/* 4 KPI Summary Cards */}
        <KpiGrid />

        {/* License List Section Header */}
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900">License List</h2>
        </div>

        {/* Filter Toolbar (Search + 3 Selects + Create License Button) */}
        <TableToolbar onOpenCreateModal={() => setCreateModalOpen(true)} />

        {/* Navy Header Data Table */}
        <LicenseTable onSelectLicense={(id) => setSelectedDrawerLicenseId(id)} />

        {/* Batch Actions Toolbar + Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
          <BatchActions />
          <Pagination />
        </div>

        {/* Bottom Page Actions (Refresh & Export) */}
        <div className="mt-8 pt-4 border-t border-slate-200/80 flex items-center justify-end gap-3">
          
          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-sm font-medium transition shadow-2xs hover:border-slate-400 focus:outline-none cursor-pointer"
          >
            <span className={isRefreshing ? 'spinning inline-flex' : 'inline-flex'}>
              <AutorenewIcon sx={{ fontSize: 18, color: '#64748b' }} />
            </span>
            <span>Refresh</span>
          </button>

          {/* Export Report Button */}
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-xs hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer"
          >
            <FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />
            <span>Export report</span>
          </button>

        </div>

      </main>

      {/* Modals & Slide-Over Panels */}
      <CreateLicenseDialog
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      <LicenseDetailsDrawer
        licenseId={selectedDrawerLicenseId}
        open={Boolean(selectedDrawerLicenseId)}
        onClose={() => setSelectedDrawerLicenseId(null)}
      />

      <CommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenCreate={() => setCreateModalOpen(true)}
        onSelectLicense={(id) => setSelectedDrawerLicenseId(id)}
      />

      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Toast Notification Container */}
      <ToastAlert />

    </div>
  );
};

export default App;
