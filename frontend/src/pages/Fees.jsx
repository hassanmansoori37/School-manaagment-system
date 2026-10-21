import { useEffect, useState } from "react";
import api from "../services/api";

const initialForm = {
  student: "",
  amount: "",
  dueDate: "",
  month: "",
  status: "Unpaid",
};

export default function Fees() {
  const [items, setItems] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadFees() {
    try {
      const response = await api.get("/fees");
      const data =
        response.data.data ??
        response.data.fees ??
        response.data;

      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Fees load nahi hui.");
    }
  }

  async function loadStudents() {
    try {
      const response = await api.get("/students");
      const data =
        response.data.data ??
        response.data.students ??
        response.data;

      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Students load nahi hue.");
    }
  }

  useEffect(() => {
    loadStudents();
    loadFees();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/fees", {
        student: form.student,
        amount: Number(form.amount),
        dueDate: form.dueDate,
        month: form.month,
        status: form.status,
      });

      setForm(initialForm);
      setSuccess("Fee record successfully add ho gaya.");
      await loadFees();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Fee add nahi hui. Backend fields check karo."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900">Fees Management</h2>
      <p className="mb-6 mt-2 text-slate-500">
        Manage student fee records and due dates.
      </p>

      {error && (
        <p className="mb-4 rounded-xl bg-red-50 p-3 text-red-700">
          {error}
        </p>
      )}

      {success && (
        <p className="mb-4 rounded-xl bg-green-50 p-3 text-green-700">
          {success}
        </p>
      )}

      <form
        onSubmit={submit}
        className="mb-6 grid gap-4 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <select
          name="student"
          required
          value={form.student}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 p-3"
        >
          <option value="">Select student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name} ({student.rollNumber})
            </option>
          ))}
        </select>

        <input
          type="number"
          name="amount"
          min="1"
          required
          placeholder="Fee Amount"
          value={form.amount}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 p-3"
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            required
            value={form.dueDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 p-3"
          />
        </div>

        <input
          type="text"
          name="month"
          placeholder="Month (e.g. October 2026)"
          value={form.month}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 p-3"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 p-3 sm:col-span-2"
        >
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

        <button
          type="submit"
          disabled={loading || students.length === 0}
          className="rounded-xl bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 sm:col-span-2"
        >
          {loading ? "Adding Fee..." : "+ Add Fee Record"}
        </button>

        {students.length === 0 && (
          <p className="text-sm text-amber-700 sm:col-span-2">
            Pehle Students page par kam az kam ek student add karo.
          </p>
        )}
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-xl font-bold">Fee Records</h3>

        {items.length > 0 ? (
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-slate-600">
                <th className="p-3">Student</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Month</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((fee) => (
                <tr key={fee._id} className="border-b last:border-0">
                  <td className="p-3">
                    {fee.student?.name ||
                      fee.studentName ||
                      "Student"}
                  </td>
                  <td className="p-3">{fee.amount}</td>
                  <td className="p-3">{fee.month || "—"}</td>
                  <td className="p-3">
                    {fee.dueDate
                      ? new Date(fee.dueDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3">{fee.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="py-4 text-slate-500">No fee records found.</p>
        )}
      </div>
    </div>
  );
}

