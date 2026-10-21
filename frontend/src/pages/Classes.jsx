
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Classes() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", section: "" });
  const [error, setError] = useState("");

  async function load() {
    try {
      const r = await api.get("/classes");
      const d = r.data.data ?? r.data.classes ?? r.data;
      setItems(Array.isArray(d) ? d : []);
    } catch (e) { setError(e.response?.data?.message || "Classes load nahi hui."); }
  }
  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post("/classes", form);
      setForm({ name: "", section: "" });
      setError("");
      load();
    } catch (e) { setError(e.response?.data?.message || "Class add nahi hui."); }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold">Classes</h2>
      <p className="mb-6 mt-2 text-slate-500">Manage school classes and sections.</p>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={submit} className="mb-6 grid gap-4 rounded-2xl bg-white p-6 sm:grid-cols-2">
        <input required placeholder="Class Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="rounded-xl border p-3" />
        <input required placeholder="Section (e.g. A)" value={form.section} onChange={e => setForm({ ...form, section: e.target.value })} className="rounded-xl border p-3" />
        <button className="rounded-xl bg-indigo-600 p-3 font-semibold text-white sm:col-span-2">Add Class</button>
      </form>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map(c => <div key={c._id} className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-xl font-bold">{c.name}</p><p className="mt-2 text-slate-500">Section {c.section}</p></div>)}
        {!items.length && <p className="text-slate-500">No classes found.</p>}
      </div>
    </div>
  );
}
