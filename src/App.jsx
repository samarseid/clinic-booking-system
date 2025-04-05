import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/Sign/SingUp";
import SignIn from "./pages/Sign/SignIn";
import Dashboard from "./pages/Clinic/Dashboard";
import Profile from "./pages/Clinic/Profile";
import Clinics from "./pages/Clinic/Clinics";
import ClinicDetails from "./pages/Clinic/ClinicDetails";
import MyAppointments from "./pages/Clinic/MyAppointments"; // MyAppointments sahifasini import qilamiz
import Policies from "./pages/Clinic/Policies";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/clinic/:id" element={<ClinicDetails />} />
        <Route path="/myappointments" element={<MyAppointments />} /> {/* SHU YERGA QO‘SHDIK */}
        <Route path="/policies" element={<Policies />} />
      </Routes>
    </Router>
  );
}

export default App;
