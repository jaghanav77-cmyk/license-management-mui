import React, { useState } from 'react';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { useLicense } from '../../context/LicenseContext';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette, onOpenSettings }) => {
  const { notifications, markAllNotificationsRead, showToast } = useLicense();
  
  // Notification popover state
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const isNotifOpen = Boolean(notifAnchor);

  // Profile menu state
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const isProfileOpen = Boolean(profileAnchor);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchor(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchor(null);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <div 
            onClick={onOpenCommandPalette}
            className="relative flex items-center cursor-pointer group"
          >
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-hover:text-slate-600 transition">
              <SearchIcon sx={{ fontSize: 18 }} />
            </span>
            <input 
              type="text" 
              readOnly
              placeholder="Search tenants, users, settings, audit logs..."
              className="w-full pl-10 pr-16 py-2 bg-slate-50 group-hover:bg-slate-100/70 border border-slate-200 rounded-lg text-sm placeholder-slate-400 focus:outline-none transition cursor-pointer"
            />
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
              <kbd className="inline-flex items-center px-2 py-0.5 border border-slate-200 rounded text-[11px] font-mono font-medium text-slate-400 bg-white shadow-xs">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Notifications */}
          <button 
            type="button"
            onClick={handleNotifClick}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition focus:outline-none"
            title="Notifications"
          >
            <Badge color="error" variant="dot" invisible={unreadCount === 0}>
              <NotificationsNoneOutlinedIcon sx={{ fontSize: 22 }} />
            </Badge>
          </button>

          <Popover
            open={isNotifOpen}
            anchorEl={notifAnchor}
            onClose={handleNotifClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: { 
                width: 360, 
                borderRadius: '16px', 
                mt: 1.5,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }
            }}
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-800">Notifications</span>
              {unreadCount > 0 && (
                <button 
                  onClick={() => {
                    markAllNotificationsRead();
                    showToast('All notifications marked as read', 'info');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
              {notifications.map(n => (
                <div 
                  key={n.id} 
                  className={`px-4 py-3 hover:bg-slate-50 transition flex items-start gap-3 cursor-pointer ${n.unread ? 'bg-blue-50/30' : ''}`}
                >
                  <div className={`mt-1 w-2 h-2 rounded-full ${n.unread ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{n.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{n.desc}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Popover>

          {/* Settings Button */}
          <button 
            type="button"
            onClick={onOpenSettings}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition focus:outline-none"
            title="Platform Settings"
          >
            <SettingsOutlinedIcon sx={{ fontSize: 22 }} />
          </button>

          {/* User Profile Pill */}
          <button 
            type="button"
            onClick={handleProfileClick}
            className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-full hover:bg-slate-100 transition border border-transparent hover:border-slate-200 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-900 via-indigo-800 to-blue-700 text-white flex items-center justify-center font-semibold text-xs shadow-xs">
              RK
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-800 leading-tight">Renu Kapoor</div>
              <div className="text-[11px] text-slate-500 font-normal leading-tight">Super Admin</div>
            </div>
            <KeyboardArrowDownIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
          </button>

          <Menu
            anchorEl={profileAnchor}
            open={isProfileOpen}
            onClose={handleProfileClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: { 
                width: 220, 
                borderRadius: '14px', 
                mt: 1.5,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }
            }}
          >
            <div className="px-4 py-2">
              <p className="text-xs font-bold text-slate-900">Renu Kapoor</p>
              <p className="text-xs text-slate-500 truncate">renu.kapoor@stackly.io</p>
            </div>
            <Divider />
            <MenuItem onClick={handleProfileClose} sx={{ fontSize: '13px' }}>Admin Profile</MenuItem>
            <MenuItem onClick={handleProfileClose} sx={{ fontSize: '13px' }}>Security & Keys</MenuItem>
            <MenuItem onClick={handleProfileClose} sx={{ fontSize: '13px' }}>Audit Logs</MenuItem>
            <Divider />
            <MenuItem 
              onClick={() => {
                handleProfileClose();
                showToast('Signed out of Super Admin session.', 'info');
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
