import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useLicense } from '../../context/LicenseContext';

export const ToastAlert: React.FC = () => {
  const { toast, closeToast } = useLicense();

  if (!toast) return null;

  return (
    <Snackbar
      open={Boolean(toast)}
      autoHideDuration={3500}
      onClose={closeToast}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert 
        onClose={closeToast} 
        severity={toast.severity} 
        variant="filled"
        sx={{ 
          width: '100%', 
          borderRadius: '12px',
          fontWeight: 500,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
};
