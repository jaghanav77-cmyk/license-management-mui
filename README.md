# Stackly License Management System (React + TypeScript + Tailwind CSS + Material UI)

A 100% functional, responsive implementation of the **License Management System** layout built with **React**, **TypeScript**, **Tailwind CSS**, and **Material UI (MUI)**.

---

## 🛠️ Tech Stack

- **React 18**: Component-driven architecture with React Hooks & Context API
- **TypeScript**: Strict type definitions for licenses, fleet metrics, filters, and modals
- **Material UI (MUI v5)**:
  - `@mui/material`: Dialog, Drawer, Badge, Popover, Menu, Checkbox, Tooltip, Switch, Snackbar, Alert
  - `@mui/icons-material`: Material Design SVG icons
  - `@emotion/react` & `@emotion/styled`: Dynamic styling engine
- **Tailwind CSS**: Pixel-perfect layout, colors, badge pills, and responsive grids
- **Vite**: Ultra-fast development server and production bundler

---

## 🚀 Running the Project

### Start Development Server
```powershell
cd "C:\Users\M SARAVANA KUMAR\.gemini\antigravity\scratch\license-management-mui"
npm.cmd run dev
```
Then visit `http://localhost:3000`.

### Build for Production
```powershell
npm.cmd run build
```

### Preview Production Build
```powershell
npm.cmd run preview
```

---

## 🎯 Features Implemented (A to Z)

1. **Top Header**:
   - MUI Search with shortcut badge `⌘K` / `Ctrl+K`. Pressing `Ctrl+K` opens the **Command Palette Dialog**.
   - Notifications Bell with MUI `Badge` (unread red dot), opening a `Popover` with live alert items and "Mark all as read".
   - Settings Gear opening the Platform Configuration `Dialog`.
   - User Profile Pill with Avatar, `Renu Kapoor`, `Super Admin`, and an interactive MUI `Menu`.

2. **4 KPI Metric Summary Cards**:
   - **Total Licenses**: `2,458` | Sky key icon | `↑ 12% vs last month`
   - **Active Licenses**: `2,104` | Mint checkmark icon | `85.6% utilization rate`
   - **Expired licenses**: `142` | Amber warning icon | `Within next 30 days`
   - **Suspended licenses**: `36` | Rose ban icon | `Requires admin review`
   - **Interactive Filtering**: Clicking any KPI card filters the table by that status and adds an active border glow.

3. **Filter & Action Controls Toolbar**:
   - Real-time text search across license keys, organizations, plans, and seats.
   - `Organization ↕` select dropdown.
   - `License Type ↕` select dropdown.
   - `Status ↕` select dropdown.
   - Dynamic `Reset Filters` button.
   - `+ Create License` button opening the MUI `CreateLicenseDialog`.

4. **Midnight Navy Data Table (`#1c2847`)**:
   - Header master checkbox with indeterminate selection support.
   - Monospaced keys (`LIC-4421-MNPR`) with one-click copy button and tooltip.
   - Bold plan with seat count (`Standard` / `50 Seats`).
   - Organization name (`123 Inc`).
   - Expiry date (`Nov 02, 2024`).
   - Color-coded status pills with dot indicators (`• Active`, `• Expiring`, `• Rejected`, `• Suspended`).
   - Clicking any row opens the **MUI Slide-over Details Drawer** with telemetry, utilization progress bar, secret tokens, and admin actions.

5. **Batch Operations Toolbar**:
   - Outlined `↻ Renew` button: Extends selected licenses by +1 year and activates them.
   - Outlined `⏸ Suspand` button: Suspends selected licenses.
   - Outlined `▶ Activite` button: Activates selected licenses.
   - Selection count badge.

6. **Dynamic Pagination**:
   - `Showing X to Y of Z entries` dynamically updating with filters.
   - Previous `<` button, numbered page buttons, and Next `>` button.

7. **Footer Actions**:
   - `↻ Refresh` button with spinning animation.
   - `Export report` button triggering actual `.csv` download.

8. **Toast Notifications**:
   - Material UI `Snackbar` and `Alert` providing feedback on all actions.
