import { useEffect, useState } from "react";
import api from "../services/api";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  qualification: "",
  phone: "",
};

export default function Teachers() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      const response = await api.get("/teachers");
      const data =
        response.data.data ??
        response.data.teachers ??
        response.data;

      setItems(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Teachers load nahi hue."
      );
    }
  }

  useEffect(() => {
    load();
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
      await api.post("/teachers", form);
      setForm(initialForm);
      setSuccess("Teacher successfully add ho gaya.");
      await load();
    } catch (err) {
      setError(
        err.response?.data?.message || "Teacher add nahi hua."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900">Teachers</h2>
      <p className="mb-6 mt-2 text-slate-500">
        Manage your teaching staff.
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
        className="mb-6 grid gap-4 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-3"
      >
        <input
          name="name"
          required
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500"
        />

        <input
          name="email"
          type="email"
          required
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500"
        />

        <input
          name="phone"
          type="tel"
          required
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500"
        />

        <input
          name="subject"
          required
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500"
        />

        <input
          name="qualification"
          required
          placeholder="Qualification (e.g. BS Computer Science)"
          value={form.qualification}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-500 sm:col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-indigo-600 p-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 sm:col-span-2 lg:col-span-3"
        >
          {loading ? "Adding Teacher..." : "+ Add Teacher"}
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-xl font-bold">Teacher List</h3>

        {items.length > 0 ? (
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-slate-600">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Qualification</th>
              </tr>
            </thead>
            <tbody>
              {items.map((teacher) => (
                <tr key={teacher._id} className="border-b last:border-0">
                  <td className="p-3 font-medium">{teacher.name}</td>
                  <td className="p-3">{teacher.email}</td>
                  <td className="p-3">{teacher.phone}</td>
                  <td className="p-3">{teacher.subject}</td>
                  <td className="p-3">{teacher.qualification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="py-5 text-slate-500">
            No teachers found yet.
          </p>
        )}
      </div>
    </div>
  );
}
