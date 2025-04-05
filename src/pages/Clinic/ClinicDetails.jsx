import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../auth/supabase";

const ClinicDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  // Klinikani olish
  useEffect(() => {
    const fetchClinicDetails = async () => {
      const { data, error } = await supabase
        .from("clinics")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching clinic:", error.message);
      } else {
        setClinic(data);
      }
      setLoading(false);
    };

    fetchClinicDetails();
  }, [id]);

  // Foydalanuvchini olish
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  // Uchrashuvga yozilish
  const bookAppointment = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage("Avval tizimga kiring!");
      return;
    }
    if (!date || !time) {
      setMessage("Sana va vaqtni tanlang!");
      return;
    }

    const { error } = await supabase.from("appointments").insert([
      {
        user_id: user.id,
        clinic_id: id,
        date: date,
        time: time,
      },
    ]);

    if (error) {
      console.error("Error adding appointment:", error.message);
      setMessage(`Xatolik: ${error.message}`);
    } else {
      setMessage("Uchrashuv muvaffaqiyatli qo‘shildi!");
      setDate("");
      setTime("");
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-600">Yuklanmoqda...</p>;

  return clinic ? (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* 🔹 Ortga qaytish tugmachasi */}
      

      <div className="text-center">
        <h1 className="text-4xl font-semibold text-indigo-600 mb-4">{clinic.name}</h1>
        <p className="text-xl text-gray-700 mb-2">Manzil: {clinic.address}</p>
        <p className="text-xl text-gray-700 mb-2">Telefon: {clinic.phone_number}</p>
        <p className="text-xl text-gray-700 mb-6">Mutaxassislik: {clinic.specialty}</p>
      </div>

      {/* 🔹 Uchrashuvga yozilish formasi */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Uchrashuvga yozilish</h2>
        <form onSubmit={bookAppointment} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="date" className="block text-lg font-medium text-gray-700">Sana tanlang:</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="block text-lg font-medium text-gray-700">Vaqt tanlang:</label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Yozilish
            </button>
            
          </div>
          <button
        className="bg-slate-500 text-white py-3 px-10 rounded-lg hover:bg-slate-700 transition-colors mb-6 text-lg w-full"
        onClick={() => navigate("/clinics")}
      >
        Ortga
      </button>
        </form>

        {message && (
          <p className={`mt-4 text-center text-lg ${message.includes("Xatolik") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  ) : (
    <p className="text-center text-lg text-red-500">Klinika topilmadi!</p>
  );
};

export default ClinicDetails;
