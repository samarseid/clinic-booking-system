import { useEffect, useState } from "react";
import { supabase } from "../../auth/supabase";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Modal uchun
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    setLoading(true);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Foydalanuvchini aniqlashda xatolik:", userError);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("appointments")
      .select("id, date, time, clinic_id, clinics(name)")
      .eq("user_id", user.id)
      .order("date", { ascending: true });

    if (error) {
      console.error("Uchrashuvlarni yuklashda xatolik:", error);
    } else {
      setAppointments(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // 🔹 Modalni ochish
  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
  };

  // 🔹 Modalni yopish
  const closeModal = () => {
    setSelectedAppointment(null);
  };

  // 🔹 Uchrashuvni bekor qilish funksiyasi
  const cancelAppointment = async () => {
    if (!selectedAppointment) return;

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", selectedAppointment.id);

    if (error) {
      console.error("Uchrashuvni bekor qilishda xatolik:", error);
    } else {
      setAppointments(appointments.filter((a) => a.id !== selectedAppointment.id));
      closeModal();
    }
  };

  return (
    <div className="container max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* 🔹 Ortga qaytish tugmasi */}
      <button
        className="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors w-full mb-6 text-lg"
        onClick={() => navigate("/dashboard")}
      >
        Ortga
      </button>
      <h1 className="text-3xl font-semibold text-indigo-600 text-center mb-8">Mening Uchrashuvlarim</h1>

      {loading ? (
        <p className="text-center text-lg text-gray-500">Ma'lumotlar yuklanmoqda...</p>
      ) : (
        <div className="appointments-list space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="appointment-card p-4 bg-gray-100 rounded-lg shadow-md hover:bg-indigo-50 cursor-pointer"
                onClick={() => openModal(appointment)}
              >
                <h2 className="text-xl font-semibold text-indigo-600">{appointment.clinics?.name || "Noma'lum klinika"}</h2>
                <p className="text-gray-600">{appointment.date} - {appointment.time}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">Hali uchrashuvlar mavjud emas!</p>
          )}
        </div>
      )}

      {/* 🔹 MODAL - Uchrashuv tafsilotlari */}
      {selectedAppointment && (
        <div className="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uchrashuv Tafsilotlari</h2>
            <p><strong>Klinika:</strong> {selectedAppointment.clinics?.name}</p>
            <p><strong>Sana:</strong> {selectedAppointment.date}</p>
            <p><strong>Soat:</strong> {selectedAppointment.time}</p>

            <div className="modal-buttons flex justify-between mt-6">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                onClick={cancelAppointment}
              >
                Uchrashuvni bekor qilish
              </button>
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={closeModal}
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
