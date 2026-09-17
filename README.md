# Stackly License Management System (Simple & Beginner-Friendly)

A 100% functional, responsive implementation of the **License Management System** layout built with **React**, **TypeScript**, **Tailwind CSS**, and **Material UI (MUI)**.

Designed to be **extremely clean, simple, and easy for any developer to understand and customize**.

---

## 📁 Super Clean & Flat Folder Structure (No Complex Nesting!)

```
src/
├── components/                  # All components in one flat, easy-to-find folder!
│   ├── Header.tsx               # Top search bar (⌘K), notifications bell, settings, profile
│   ├── KpiCards.tsx             # 4 metric cards (2,458 Total, 2,104 Active, 142 Expired, 36 Suspended)
│   ├── LicenseTable.tsx         # Filter toolbar + #1c2847 navy table + batch actions + pagination
│   ├── CreateLicenseModal.tsx   # Modal dialog to provision a new license (with auto-generated key)
│   ├── LicenseDetailsDrawer.tsx # Slide-over inspection drawer on row click
│   ├── CommandPalette.tsx       # Quick search modal (Ctrl+K or clicking search)
│   └── SettingsModal.tsx        # Platform configuration modal
├── types.ts                     # Single file with clean, easy TypeScript interfaces
├── initialData.ts               # Sample mock data matching the screenshot (edit directly here!)
├── App.tsx                      # Main page managing clean state with standard React useState
├── main.tsx                     # React root & MUI ThemeProvider
└── index.css                    # Tailwind CSS & badge styles
```

---

## 🚀 How to Run

### Start Development Server
```powershell
cd "C:\Users\M SARAVANA KUMAR\.gemini\antigravity\scratch\license-management-mui"
npm.cmd run dev
```
Open **`http://localhost:3000`** in your browser.

### Build for Production
```powershell
npm.cmd run build
```

---

## 🎯 Features Working 100% (A to Z)

1. **Top Header**:
   - Live Search with keyboard shortcut `⌘K` / `Ctrl+K`. Pressing `Ctrl+K` opens the Command Palette.
   - Notifications Bell with red unread badge, interactive popover, and "Mark all as read".
   - Settings Gear opening configuration toggles.
   - User Profile Pill with Avatar (`RK`), `Renu Kapoor`, `Super Admin`, and dropdown menu.

2. **4 KPI Stat Cards**:
   - **Total Licenses**: `2,458` (`↑ 12% vs last month`)
   - **Active Licenses**: `2,104` (`85.6% utilization rate`)
   - **Expired Licenses**: `142` (`Within next 30 days`)
   - **Suspended Licenses**: `36` (`Requires admin review`)
   - **Interactive Filtering**: Clicking any KPI card filters the table by that status and highlights the active card.

3. **Filter Toolbar**:
   - Search input for real-time text query.
   - 3 Select dropdowns: `Organization ↕`, `License Type ↕`, and `Status ↕`.
   - `+ Create License` button opening the provision dialog.

4. **Midnight Navy Data Table (`#1c2847`)**:
   - Checkboxes with master selection support.
   - Monospaced keys (`LIC-4421-MNPR`) with hover copy button and tooltip.
   - Plan with seat count underneath (`Standard` / `50 Seats`).
   - Color-coded status pills with dot indicators (`• Active`, `• Expiring`, `• Rejected`, `• Suspended`).
   - Clicking any row slides open the **Inspection Drawer** with usage telemetry, secret tokens, and quick actions.

5. **Batch Operations**:
   - Outlined `↻ Renew`, `⏸ Suspand`, and `▶ Activite` buttons that update selected records in real time.

6. **Pagination & Page Actions**:
   - Dynamic counter: `Showing X to Y of Z entries` with interactive `< 1 2 3 >` navigation.
   - `↻ Refresh` button with spinning animation.
   - `Export report` button triggering actual `.csv` download.
   - Material UI `Snackbar` & `Alert` notifications for every action.
