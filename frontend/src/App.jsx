import { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("token"))
  );

  const navigate = useNavigate();

  function handleLogin() {
    setLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/login");
  }

  function protectedPage(element) {
    return loggedIn ? (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Navbar onLogout={logout} />
          <main className="p-4 sm:p-6 lg:p-8">{element}</main>
        </div>
      </div>
    ) : (
      <Navigate to="/login" replace />
    );
  }


  return (
    <Routes>
      <Route
        path="/login"
        element={
          loggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      <Route
        path="/signup"
        element={
          loggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Signup onLogin={handleLogin} />
          )
        }
      />

      <Route path="/" element={protectedPage(<Dashboard />)} />
      <Route path="/students" element={protectedPage(<Students />)} />
      <Route path="/teachers" element={protectedPage(<Teachers />)} />
      <Route path="/classes" element={protectedPage(<Classes />)} />
      <Route path="/attendance" element={protectedPage(<Attendance />)} />
      <Route path="/fees" element={protectedPage(<Fees />)} />

      <Route
        path="*"
        element={<Navigate to={loggedIn ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}

