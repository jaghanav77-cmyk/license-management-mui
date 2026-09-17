import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useLicense } from '../../context/LicenseContext';

export const Pagination: React.FC = () => {
  const { startIndex, endIndex, totalDisplayEntries, currentPage, totalPages, setPage } = useLicense();

  const maxBtns = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxBtns - 1);

  if (endPage - startPage < maxBtns - 1) {
    startPage = Math.max(1, endPage - maxBtns + 1);
  }

  const pages: number[] = [];
  for (let p = startPage; p <= endPage; p++) {
    pages.push(p);
  }

  return (
    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
      
      {/* Showing entries count */}
      <div className="text-xs text-slate-500 font-medium">
        Showing {startIndex} to {endIndex} of {totalDisplayEntries} entries
      </div>

      {/* Pagination Controls */}
      <nav className="inline-flex items-center gap-1 select-none">
        
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
          className={`w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-medium text-slate-500 hover:bg-slate-50 transition ${
            currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <ChevronLeftIcon sx={{ fontSize: 16 }} />
        </button>

        {/* Page Number Buttons */}
        {pages.map(p => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'border border-slate-200 text-slate-700 hover:bg-slate-50 bg-white'
              }`}
            >
              {p}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
          className={`w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-medium text-slate-500 hover:bg-slate-50 transition ${
            currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <ChevronRightIcon sx={{ fontSize: 16 }} />
        </button>

      </nav>

    </div>
  );
};
