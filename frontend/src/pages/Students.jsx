
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", rollNumber: "", className: "",
    age: "", gender: "Male", parentPhone: "",
  });

  async function loadStudents() {
    try {
      const res = await api.get("/students");
      const data = res.data.data ?? res.data.students ?? res.data;
      setStudents(Array.isArray(data) ? data : []);
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || "Students load nahi hue.");
    }
  }

  useEffect(() => { loadStudents(); }, []);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post("/students", { ...form, age: Number(form.age) });
      setForm({
        name: "", email: "", rollNumber: "", className: "",
        age: "", gender: "Male", parentPhone: "",
      });
      setError("");
      await loadStudents();
    } catch (e) {
      setError(e.response?.data?.message || "Student add nahi hua.");
    }
  }

  async function remove(id) {
    if (!window.confirm("Is student ko delete karna hai?")) return;
    try {
      await api.delete(`/students/${id}`);
      await loadStudents();
    } catch (e) {
      setError(e.response?.data?.message || "Delete failed.");
    }
  }

  const fields = [
    ["name", "Full Name"], ["email", "Email"], ["rollNumber", "Roll Number"],
    ["className", "Class"], ["age", "Age"], ["parentPhone", "Parent Phone"],
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold">Students</h2>
      <p className="mb-6 mt-2 text-slate-500">Add and manage school students.</p>

      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}

      <form onSubmit={submit} className="mb-8 grid gap-4 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2 xl:grid-cols-3">
        {fields.map(([name, label]) => (
          <label key={name} className="text-sm font-medium">
            {label}
            <input
              required
              name={name}
              type={name === "email" ? "email" : name === "age" ? "number" : "text"}
              min={name === "age" ? 3 : undefined}
              max={name === "age" ? 100 : undefined}
              value={form[name]}
              onChange={change}
              className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500"
            />
          </label>
        ))}

        <label className="text-sm font-medium">
          Gender
          <select name="gender" value={form.gender} onChange={change} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2.5">
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </label>

        <div className="flex items-end">
          <button className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
            Add Student
          </button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>{["Name", "Roll Number", "Class", "Email", "Age", "Action"].map(x => <th key={x} className="p-4">{x}</th>)}</tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id} className="border-t border-slate-100">
                <td className="p-4 font-medium">{s.name}</td>
                <td className="p-4">{s.rollNumber}</td>
                <td className="p-4">{s.className}</td>
                <td className="p-4">{s.email}</td>
                <td className="p-4">{s.age}</td>
                <td className="p-4">
                  <button onClick={() => remove(s._id)} className="rounded-lg bg-red-50 px-3 py-2 text-red-600">Delete</button>
                </td>
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-slate-500">No students found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
