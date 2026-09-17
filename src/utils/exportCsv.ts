import { LicenseItem } from '../types/license';

export const exportLicensesToCsv = (licenses: LicenseItem[]) => {
  if (licenses.length === 0) return false;

  const headers = [
    'License Key',
    'Plan Tier',
    'Seats Quota',
    'Organization',
    'Expiry Date',
    'Status',
    'Tenant Admin',
    'Created Date'
  ];

  const rows = licenses.map(l => [
    `"${l.key}"`,
    `"${l.plan}"`,
    l.seats,
    `"${l.organization}"`,
    `"${l.expiryDate}"`,
    `"${l.status}"`,
    `"${l.adminEmail || ''}"`,
    `"${l.createdDate || ''}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `stackly_licenses_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
};
