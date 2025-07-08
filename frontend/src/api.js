import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

// ✅ Get user from localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Pass user as a prop to Dashboard */}
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />

      </Routes>
    </Router>
  );
}

export default App;
