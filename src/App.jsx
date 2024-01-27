import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/frontend/Home/Home";
import Login from "./pages/frontend/Auth/Login";
import Register from "./pages/frontend/Auth/Register";
import Dashboard from "./pages/backend/Dashboard/Dashboard";
import Specialities from "./pages/backend/Specialities/Specialities";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/specialities" element={<Specialities />} />
      </Routes>
    </Router>
  );
}

export default App;
