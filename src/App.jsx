/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminPrivateRoute, AdminCredentialRoute } from "@/routes/AdminRoute";
import {
  PublicRoute,
  DoctorRoute,
  CredentialRoute,
} from "@/routes/PublicRoute";

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

// Doctor
import DoctorSetup from "./pages/frontend/AccountSetup/AccountSetup";
import DoctorDashboard from "./pages/frontend/Dashboard/Dashboard";
import DoctorAppointments from "./pages/frontend/Dashboard/Appoinments";
import DoctorPatients from "./pages/frontend/Dashboard/Patients";
import DoctorTimings from "./pages/frontend/Dashboard/Timings";
import DoctorSlots from "./pages/frontend/Dashboard/Slots";
import DoctorReviews from "./pages/frontend/Dashboard/Reviews";
import DoctorProfile from "./pages/frontend/Dashboard/Profile";
import DoctorWallet from "./pages/frontend/Dashboard/Wallet";

// Administrator
import Dashboard from "./pages/backend/Dashboard/Dashboard";
import Specialities from "./pages/backend/Specialities/Specialities";
import DoctorsList from "./pages/backend/Doctors/Doctors";
import PatientsList from "./pages/backend/Patients/Patients";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<CredentialRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id/:name" element={<DoctorView />} />
          <Route path="/doctors/:id/:name/booking" element={<Booking />} />

          <Route element={<PublicRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/appointments" element={<MyBookings />} />
            <Route path="/profile/favourites" element={<Favourites />} />
            <Route path="/profile/wallet" element={<Wallet />} />
            <Route
              path="/profile/change-password"
              element={<PasswordChange />}
            />
          </Route>

          <Route element={<DoctorRoute />}>
            <Route path="/register/profile-setup" element={<DoctorSetup />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route
              path="/doctor/dashboard/appointments"
              element={<DoctorAppointments />}
            />
            <Route
              path="/doctor/dashboard/my-patients"
              element={<DoctorPatients />}
            />
            <Route
              path="/doctor/dashboard/timings"
              element={<DoctorTimings />}
            />
            <Route path="/doctor/dashboard/slots" element={<DoctorSlots />} />
            <Route
              path="/doctor/dashboard/reviews"
              element={<DoctorReviews />}
            />
            <Route
              path="/doctor/dashboard/profile"
              element={<DoctorProfile />}
            />
            <Route path="/doctor/dashboard/wallet" element={<DoctorWallet />} />
          </Route>

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/specialities" element={<Specialities />} />
            <Route path="/admin/doctors" element={<DoctorsList />} />
            <Route path="/admin/patients" element={<PatientsList />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
