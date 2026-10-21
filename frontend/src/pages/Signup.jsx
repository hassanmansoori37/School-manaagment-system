import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import api from "../services/api";

export default function Signup({ onLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", form);
      const data = response.data;
      const token = data.token || data.data?.token;
      const user = data.user || data.data?.user;

      if (token) {
        localStorage.setItem("token", token);
        if (user) localStorage.setItem("user", JSON.stringify(user));
        onLogin();
        navigate("/");
      } else {
        navigate("/login", {
          state: { message: "Account created. Please log in." },
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-5">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <div className="hidden flex-col justify-between bg-indigo-600 p-10 text-white md:flex">
          <GraduationCap size={48} />
          <div>
            <h1 className="text-4xl font-bold">Join EduManage</h1>
            <p className="mt-4 text-indigo-100">
              Create your account to access the school management portal.
            </p>
          </div>
          <p className="text-sm text-indigo-200">School Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 sm:p-10">
          <div className="mb-5 md:hidden">
            <GraduationCap size={38} className="text-indigo-600" />
          </div>

          <h2 className="text-3xl font-bold text-slate-900">Create account</h2>
          <p className="mt-2 text-sm text-slate-500">
            Enter your details to register.
          </p>

          {error && (
            <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <label className="mt-6 block text-sm font-semibold">Full Name</label>
          <input
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            placeholder="Enter your full name"
          />

          <label className="mt-4 block text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            placeholder="you@example.com"
          />

          <label className="mt-4 block text-sm font-semibold">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            minLength={6}
            required
            value={form.password}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            placeholder="Create a password"
          />

          <label className="mt-4 block text-sm font-semibold">Account Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
