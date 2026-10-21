
import { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  Wallet,
  TrendingUp,
} from "lucide-react";
import api from "../services/api";

const initialCards = [
  { title: "Students", value: "—", icon: Users, color: "bg-blue-100 text-blue-600" },
  { title: "Teachers", value: "—", icon: GraduationCap, color: "bg-purple-100 text-purple-600" },
  { title: "Classes", value: "—", icon: BookOpen, color: "bg-amber-100 text-amber-600" },
  { title: "Fees Records", value: "—", icon: Wallet, color: "bg-emerald-100 text-emerald-600" },
];

export default function Dashboard() {
  const [cards, setCards] = useState(initialCards);
  const [message, setMessage] = useState("Loading dashboard data...");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await api.get("/dashboard/stats")
        const d = response.data.data || response.data;

        setCards([
          { ...initialCards[0], value: d.totalStudents ?? d.studentsCount ?? "—" },
          { ...initialCards[1], value: d.totalTeachers ?? d.teachersCount ?? "—" },
          { ...initialCards[2], value: d.totalClasses ?? d.classesCount ?? "—" },
          { ...initialCards[3], value: d.totalFees ?? d.feesCount ?? "—" },
        ]);

        setMessage("Dashboard data loaded. Counts depend on your backend response.");
      } catch {
        setMessage("Dashboard API data could not be loaded. Check backend route and login.");
      }
    }

    loadDashboard();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600">OVERVIEW</p>
        <h2 className="mt-2 text-3xl font-bold">Dashboard</h2>
        <p className="mt-2 text-slate-500">Welcome to your school administration panel.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, icon: Icon, color }) => (
          <div key={title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{title}</p>
              <div className={`rounded-xl p-3 ${color}`}><Icon size={23} /></div>
            </div>
            <p className="mt-5 text-3xl font-bold">{value}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <TrendingUp size={14} /> School overview
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6">
        <h3 className="text-lg font-bold">System status</h3>
        <p className="mt-2 text-sm text-slate-500">{message}</p>
      </div>
    </div>
  );
}
