import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import api from "../services/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("admin@school.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const data = response.data;

      const token = data.token || data.data?.token;
      const user = data.user || data.data?.user;

      if (!token) {
        throw new Error(data.message || "Login response mein token nahi mila.");
      }

      localStorage.setItem("token", token);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      onLogin();
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Backend check karo."
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
            <h1 className="text-4xl font-bold leading-tight">
              Manage your school smarter.
            </h1>
            <p className="mt-4 text-indigo-100">
              Students, teachers, attendance and fees — all in one place.
            </p>
          </div>

          <p className="text-sm text-indigo-200">EduManage Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 sm:p-10">
          <div className="mb-8 md:hidden">
            <GraduationCap size={38} className="text-indigo-600" />
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to your administrator account.
          </p>

          {error && (
            <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <label className="mt-7 block text-sm font-semibold">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            placeholder="admin@school.com"
          />

          <label className="mt-5 block text-sm font-semibold">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-indigo-600 py-3.5 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-5 text-center text-xs text-slate-400">
            Secure School Management System
          </p>
            <p className="mt-5 text-center text-sm text-slate-600">
  Don't have an account?{" "}
  <Link to="/signup" className="font-semibold text-indigo-600 hover:underline">
    Sign up
  </Link>
</p>
        </form>
      </div>
    </div>
  );
}

