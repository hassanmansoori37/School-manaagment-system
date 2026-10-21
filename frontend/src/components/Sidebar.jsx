import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  Wallet,
  School,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Students", path: "/students", icon: Users },
  { name: "Teachers", path: "/teachers", icon: GraduationCap },
  { name: "Classes", path: "/classes", icon: School },
  { name: "Attendance", path: "/attendance", icon: CalendarCheck },
  { name: "Fees", path: "/fees", icon: Wallet },
];

export default function Sidebar({ onClose }) {
  return (
    <aside className="flex h-full min-h-screen w-64 flex-col bg-slate-950 text-white">
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2">
            <GraduationCap size={25} />
          </div>
          <div>
            <h2 className="text-lg font-bold">EduManage</h2>
            <p className="text-xs text-slate-400">School Management</p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="px-4 pt-7">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/30"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-5">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm font-semibold">School Admin</p>
          <p className="mt-1 text-xs text-slate-400">
            Management Portal
          </p>
        </div>
      </div>
    </aside>
  );
}

