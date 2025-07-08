// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <h1 className="text-2xl font-bold text-center text-blue-600 mt-6">
  🚀 MetaSkill – Unleash Your Potential 💼
</h1>

        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
