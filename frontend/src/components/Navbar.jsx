import { Bell, Search, LogOut, Menu } from "lucide-react";

export default function Navbar({ onLogout, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
            School Management
          </h1>
          <p className="hidden text-sm text-slate-500 sm:block">
            Welcome to your admin dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"
          aria-label="Search"
        >
          <Search size={19} />
        </button>

        <button
          type="button"
          className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

