
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Attendance() {
  const [items, setItems] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: "", date: new Date().toISOString().slice(0, 10), status: "Present" });
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/students").then(r => {
      const d = r.data.data ?? r.data.students ?? r.data;
      setStudents(Array.isArray(d) ? d : []);
    }).catch(() => {});
    load();
  }, []);

  async function load() {
    try {
      const r = await api.get("/attendance");
      const d = r.data.data ?? r.data.attendance ?? r.data;
      setItems(Array.isArray(d) ? d : []);
    } catch (e) { setError(e.response?.data?.message || "Attendance load nahi hui."); }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post("/attendance", form);
      setError("");
      load();
    } catch (e) { setError(e.response?.data?.message || "Attendance save nahi hui. Backend fields check karo."); }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold">Attendance</h2>
      <p className="mb-6 mt-2 text-slate-500">Record student attendance.</p>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={submit} className="mb-6 grid gap-4 rounded-2xl bg-white p-6 sm:grid-cols-3">
        <select required value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })} className="rounded-xl border p-3">
          <option value="">Select student</option>
          {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.rollNumber})</option>)}
        </select>
        <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="rounded-xl border p-3" />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="rounded-xl border p-3">
          <option>Present</option><option>Absent</option><option>Late</option>
        </select>
        <button className="rounded-xl bg-indigo-600 p-3 font-semibold text-white sm:col-span-3">Save Attendance</button>
      </form>
      <div className="rounded-2xl bg-white p-5">
        {items.length ? items.map(a => <div key={a._id} className="border-b p-4">{a.student?.name || a.studentName || a.studentId} — {a.status} — {String(a.date).slice(0, 10)}</div>) : <p className="text-slate-500">No attendance records found.</p>}
      </div>
    </div>
  );
}
