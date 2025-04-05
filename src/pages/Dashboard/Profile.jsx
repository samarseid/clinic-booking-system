import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../auth/supabase";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        navigate("/signin");
        return;
      }

      setUser(user);
      setForm({
        fullName: user.user_metadata?.fullName || "",
        email: user.email || "",
        password: "",
      });
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!user) return;

    if (form.password) {
      await supabase.auth.updateUser({ password: form.password });
    }

    if (form.fullName !== user.user_metadata?.fullName) {
      await supabase.auth.updateUser({
        data: { fullName: form.fullName },
      });
    }

    setEditing(false);
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    const { error } = await supabase.rpc("delete_user", {
      uid: user.id,
    });

    if (!error) {
      await supabase.auth.signOut();
      navigate("/signin");
    } else {
      alert("Hisobni o‘chirishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold text-slate-800 text-center mb-8">
          Profil ma'lumotlari
        </h2>

        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Ism</label>
            {editing ? (
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-base text-slate-700">{form.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              readOnly
              className="w-full px-4 py-3 border rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-slate-600 mb-1">Yangi parol</label>
            {editing ? (
              <input
                type="password"
                name="password"
                placeholder="Yangi parol kiriting"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-base text-slate-700">********</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          {editing ? (
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Saqlash
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              O‘zgartirish
            </button>
          )}

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-slate-300 text-slate-800 px-6 py-3 rounded-lg hover:bg-slate-400 transition"
          >
            Asosiy Sahifaga qaytish
          </button>
        </div>

        {/* Delete Account */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Hisobni o‘chirish
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Haqiqatan ham hisobingizni o‘chirmoqchimisiz?
            </h3>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Ha, o‘chirish
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-slate-500 text-white px-5 py-2 rounded-lg hover:bg-slate-600 transition"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
