import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../auth/supabase";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      const storedUserData = localStorage.getItem("userData");
      setUserData(JSON.parse(storedUserData));
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">
          Klinikaga Qabul Boshqaruvi
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-2">
            Salom, {userData?.fullName || "Foydalanuvchi"}!
          </h2>
          <p className="text-slate-600 text-base mb-8">
            Klinikadagi barcha qabul va uchrashuvlaringizni shu yerda kuzatishingiz mumkin.
          </p>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-medium text-indigo-700 mb-4">Qabulga yozilish</h3>
              <button
                onClick={() => navigate("/Clinics")}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Yangi qabul yaratish
              </button>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-medium text-indigo-700 mb-4">Uchrashuvlarim</h3>
              <button
                onClick={() => navigate("/myappointments")}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Mening uchrashuvlarim
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="mt-10 flex flex-col sm:flex-row sm:justify-between gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="w-full sm:w-auto px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition font-medium"
            >
              Profilga o‘tish
            </button>

            <button
              onClick={() => navigate("/policies")}
              className="w-full sm:w-auto px-6 py-3 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition font-medium"
            >
              Siyosatlar bilan tanishish
            </button>
          </div>

          {/* Logout */}
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                signOut();
                navigate("/signin");
              }}
              className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
            >
              Hisobdan chiqish
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
