import { useEffect, useState } from "react";
import { supabase } from "../../auth/supabase";
import { Link, useNavigate } from "react-router-dom";

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinics = async () => {
      const { data, error } = await supabase
        .from("clinics")
        .select("id, name");

      if (error) {
        console.error("Error fetching clinics:", error);
      } else {
        setClinics(data);
      }

      setLoading(false);
    };

    fetchClinics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Klinikalar ro‘yxati */}
        <h1 className="text-4xl font-semibold text-indigo-800 text-center mb-10">
          Klinikalar Ro‘yxati
        </h1>

        {/* Klinikalar grid */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Ma'lumotlar yuklanmoqda...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {clinics.length > 0 ? (
              clinics.map((clinic) => (
                <Link
                  to={`/clinic/${clinic.id}`}
                  key={clinic.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-200"
                >
                  <h2 className="text-2xl font-medium text-gray-800 mb-4">
                    {clinic.name}
                  </h2>
                  <p className="text-lg text-gray-600">Batafsil ma'lumot uchun bosing.</p>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center text-red-600 text-xl">
                Klinikalar mavjud emas.
              </div>
            )}
          </div>
        )}

        {/* Asosiy sahifaga qaytish */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-slate-500 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-all"
          >
            Asosiy sahifaga qaytish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clinics;
