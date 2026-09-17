import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { useLicense } from '../../context/LicenseContext';
import { StatusBadge } from '../common/StatusBadge';

interface LicenseTableProps {
  onSelectLicense: (id: string) => void;
}

export const LicenseTable: React.FC<LicenseTableProps> = ({ onSelectLicense }) => {
  const { 
    paginatedLicenses, 
    selectedIds, 
    toggleSelect, 
    toggleSelectAllVisible, 
    resetFilters,
    showToast 
  } = useLicense();

  const visibleIds = paginatedLicenses.map(l => l.id);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every(id => selectedIds.has(id));
  const someVisibleSelected = visibleIds.some(id => selectedIds.has(id));

  const handleCopyKey = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(key).then(() => {
      showToast(`Copied ${key} to clipboard!`, 'success');
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden mb-5">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          
          {/* Deep Midnight Navy Table Header */}
          <thead className="table-header-navy text-white text-[11px] font-semibold uppercase tracking-wider select-none">
            <tr>
              <th scope="col" className="py-3.5 pl-5 pr-3 w-12 text-center">
                <Checkbox
                  size="small"
                  checked={allVisibleSelected}
                  indeterminate={!allVisibleSelected && someVisibleSelected}
                  onChange={toggleSelectAllVisible}
                  sx={{
                    color: '#64748b',
                    padding: 0,
                    '&.Mui-checked': { color: '#3b82f6' },
                    '&.MuiCheckbox-indeterminate': { color: '#3b82f6' }
                  }}
                />
              </th>
              <th scope="col" className="py-3.5 px-4">LICENSE KEY</th>
              <th scope="col" className="py-3.5 px-4">ORGANIZATION PLAN</th>
              <th scope="col" className="py-3.5 px-4">LICENSE TYPE</th>
              <th scope="col" className="py-3.5 px-4">EXPIRY DATE</th>
              <th scope="col" className="py-3.5 px-4 text-center">LICENSE STATUS</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-sm">
            {paginatedLicenses.map(lic => {
              const isSelected = selectedIds.has(lic.id);

              return (
                <tr
                  key={lic.id}
                  onClick={() => onSelectLicense(lic.id)}
                  className={`border-b border-slate-100 hover:bg-slate-50/80 transition group cursor-pointer ${
                    isSelected ? 'bg-blue-50/40' : 'bg-white'
                  }`}
                >
                  {/* Checkbox */}
                  <td 
                    className="py-4 pl-5 pr-3 w-12 text-center align-middle"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      size="small"
                      checked={isSelected}
                      onChange={() => toggleSelect(lic.id)}
                      sx={{
                        color: '#cbd5e1',
                        padding: 0,
                        '&.Mui-checked': { color: '#2563eb' }
                      }}
                    />
                  </td>

                  {/* License Key */}
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center gap-2">
                      <span 
                        className="font-mono font-medium text-slate-900 group-hover:text-blue-600 transition"
                        title="Click to view details"
                      >
                        {lic.key}
                      </span>
                      <Tooltip title="Copy License Key" arrow>
                        <button
                          type="button"
                          onClick={(e) => handleCopyKey(e, lic.key)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
                        >
                          <ContentCopyIcon sx={{ fontSize: 14 }} />
                        </button>
                      </Tooltip>
                    </div>
                  </td>

                  {/* Organization Plan */}
                  <td className="py-4 px-4 align-middle">
                    <div>
                      <div className="font-bold text-slate-900 text-[13px] leading-tight">{lic.plan}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{lic.seats} Seats</div>
                    </div>
                  </td>

                  {/* License Type / Org */}
                  <td className="py-4 px-4 align-middle text-slate-700 font-medium text-[13px]">
                    {lic.organization}
                  </td>

                  {/* Expiry Date */}
                  <td className="py-4 px-4 align-middle text-slate-700 text-[13px] whitespace-nowrap">
                    {lic.expiryDate}
                  </td>

                  {/* License Status Badge */}
                  <td className="py-4 px-4 align-middle text-center">
                    <StatusBadge status={lic.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

      {/* Empty State */}
      {paginatedLicenses.length === 0 && (
        <div className="py-12 text-center">
          <DescriptionOutlinedIcon sx={{ fontSize: 44, color: '#cbd5e1' }} />
          <h3 className="mt-2 text-sm font-semibold text-slate-800">No licenses found</h3>
          <p className="mt-1 text-xs text-slate-500">No records match your active search or filter criteria.</p>
          <button 
            type="button"
            onClick={resetFilters} 
            className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear search filters
          </button>
        </div>
      )}

    </div>
  );
};
