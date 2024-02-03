import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Patient
import Home from "./pages/frontend/Home/Home";
import Doctors from "./pages/frontend/Doctors/Doctors";
import DoctorView from "./pages/frontend/Doctors/DoctorView";
import Booking from "./pages/frontend/Doctors/Booking";
import Profile from "./pages/frontend/Profile/Profile";
import MyBookings from "./pages/frontend/Profile/MyBookings";
import Favourites from "./pages/frontend/Profile/Favourites";
import Wallet from "./pages/frontend/Profile/Wallet";
import PasswordChange from "./pages/frontend/Profile/PasswordChange";
import Login from "./pages/frontend/Auth/Login";
import Register from "./pages/frontend/Auth/Register";

// Administrator
import Dashboard from "./pages/backend/Dashboard/Dashboard";
import Specialities from "./pages/backend/Specialities/Specialities";
import DoctorList from "./pages/backend/Doctors/Doctors";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id/:name" element={<DoctorView />} />
        <Route path="/doctors/:id/:name/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/appointments" element={<MyBookings />} />
        <Route path="/profile/favourites" element={<Favourites />} />
        <Route path="/profile/wallet" element={<Wallet />} />
        <Route path="/profile/change-password" element={<PasswordChange />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/specialities" element={<Specialities />} />
        <Route path="/admin/doctors" element={<DoctorList />} />
      </Routes>
    </Router>
  );
}

export default App;
