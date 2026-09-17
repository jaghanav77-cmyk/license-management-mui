import React, { useState } from 'react';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// ==============================================================================
// Header Component
// Top navigation bar with Search, Notifications, Settings, and User Profile
// ==============================================================================
interface HeaderProps {
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onShowToast: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenSettings, onShowToast }) => {
  // Notification popover state
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const [hasUnread, setHasUnread] = useState(true);

  // Profile dropdown menu state
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  const notifications = [
    { id: 1, title: 'License Expiring Soon', desc: 'LIC-4421-MNPR expires within 30 days', time: '10m ago' },
    { id: 2, title: 'Admin Review Required', desc: 'Suspended license requires review', time: '1h ago' },
    { id: 3, title: 'Renewal Confirmed', desc: 'Enterprise tier license approved', time: '4h ago' }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* 1. Global Search Box (Clicking opens Command Palette or press Ctrl+K) */}
        <div className="flex-1 max-w-xl">
          <div 
            onClick={onOpenSearch}
            className="relative flex items-center cursor-pointer group"
          >
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-hover:text-slate-600 transition">
              <SearchIcon sx={{ fontSize: 18 }} />
            </span>
            <input 
              type="text" 
              readOnly
              placeholder="Search tenants, users, settings, audit logs..."
              className="w-full pl-10 pr-16 py-2 bg-slate-50 group-hover:bg-slate-100/80 border border-slate-200 rounded-lg text-sm placeholder-slate-400 transition cursor-pointer focus:outline-none"
            />
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
              <kbd className="inline-flex items-center px-2 py-0.5 border border-slate-200 rounded text-[11px] font-mono font-medium text-slate-400 bg-white shadow-xs">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* 2. Right Side Buttons (Notifications, Settings, User Profile) */}
        <div className="flex items-center gap-3">
          
          {/* Notifications Bell */}
          <button 
            type="button"
            onClick={(e) => setNotifAnchor(e.currentTarget)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            title="Notifications"
          >
            <Badge color="error" variant="dot" invisible={!hasUnread}>
              <NotificationsNoneOutlinedIcon sx={{ fontSize: 22 }} />
            </Badge>
          </button>

          {/* Notifications Dropdown */}
          <Popover
            open={Boolean(notifAnchor)}
            anchorEl={notifAnchor}
            onClose={() => setNotifAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: { width: 340, borderRadius: '14px', mt: 1.5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }
            }}
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-800">Notifications</span>
              {hasUnread && (
                <button 
                  onClick={() => {
                    setHasUnread(false);
                    onShowToast('All notifications marked as read');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
              {notifications.map(n => (
                <div key={n.id} className="p-3 hover:bg-slate-50 transition cursor-pointer">
                  <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                </div>
              ))}
            </div>
          </Popover>

          {/* Settings Button */}
          <button 
            type="button"
            onClick={onOpenSettings}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            title="Platform Settings"
          >
            <SettingsOutlinedIcon sx={{ fontSize: 22 }} />
          </button>

          {/* User Profile Pill */}
          <button 
            type="button"
            onClick={(e) => setProfileAnchor(e.currentTarget)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer border border-transparent hover:border-slate-200"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-900 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              RK
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-800 leading-tight">Renu Kapoor</div>
              <div className="text-[11px] text-slate-500 font-normal leading-tight">Super Admin</div>
            </div>
            <KeyboardArrowDownIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
          </button>

          {/* Profile Menu Dropdown */}
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: { width: 200, borderRadius: '12px', mt: 1.5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }
            }}
          >
            <div className="px-4 py-2">
              <p className="text-xs font-bold text-slate-900">Renu Kapoor</p>
              <p className="text-xs text-slate-400 truncate">renu.kapoor@stackly.io</p>
            </div>
            <Divider />
            <MenuItem onClick={() => setProfileAnchor(null)} sx={{ fontSize: '13px' }}>Profile</MenuItem>
            <MenuItem onClick={() => setProfileAnchor(null)} sx={{ fontSize: '13px' }}>Security Settings</MenuItem>
            <Divider />
            <MenuItem 
              onClick={() => {
                setProfileAnchor(null);
                onShowToast('Logged out of Super Admin session');
              }} 
              sx={{ fontSize: '13px', color: '#dc2626', fontWeight: 500 }}
            >
              Log out
            </MenuItem>
          </Menu>

        </div>
      </div>
    </header>
  );
};
