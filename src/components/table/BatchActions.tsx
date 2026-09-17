import React from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useLicense } from '../../context/LicenseContext';

export const BatchActions: React.FC = () => {
  const { selectedIds, batchRenew, batchSuspend, batchActivate, showToast } = useLicense();

  const selectedCount = selectedIds.size;
  const hasSelection = selectedCount > 0;

  const handleRenew = () => {
    const count = batchRenew();
    showToast(`Successfully renewed ${count} license${count > 1 ? 's' : ''}!`, 'success');
  };

  const handleSuspend = () => {
    const count = batchSuspend();
    showToast(`Suspended ${count} license${count > 1 ? 's' : ''}.`, 'warning');
  };

  const handleActivate = () => {
    const count = batchActivate();
    showToast(`Activated ${count} license${count > 1 ? 's' : ''}!`, 'success');
  };

  return (
    <div className="flex items-center gap-2.5 w-full md:w-auto justify-start flex-wrap">
      
      {/* Renew Button */}
      <button 
        type="button" 
        onClick={handleRenew}
        disabled={!hasSelection}
        className="btn-action-outline"
        title="Extend expiry date for selected licenses by 1 year"
      >
        <AutorenewIcon sx={{ fontSize: 16 }} />
        <span>Renew</span>
      </button>

      {/* Suspand Button */}
      <button 
        type="button" 
        onClick={handleSuspend}
        disabled={!hasSelection}
        className="btn-action-outline"
        title="Suspend selected licenses"
      >
        <PauseCircleOutlineIcon sx={{ fontSize: 16 }} />
        <span>Suspand</span>
      </button>

      {/* Activite Button */}
      <button 
        type="button" 
        onClick={handleActivate}
        disabled={!hasSelection}
        className="btn-action-outline"
        title="Reactivate selected licenses"
      >
        <PlayCircleOutlineIcon sx={{ fontSize: 16 }} />
        <span>Activite</span>
      </button>

      {/* Selected Count Tag */}
      {hasSelection && (
        <span className="text-xs text-slate-500 font-medium ml-1">
          {selectedCount} selected
        </span>
      )}

    </div>
  );
};
