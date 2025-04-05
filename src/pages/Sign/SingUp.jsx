import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../auth/supabase";

// Google Font import (faqat birinchi yuklashda kerak)
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(fullName, email, password);
      alert("Emailingizni tasdiqlang!");
      navigate("/signin");
    } catch (error) {
      console.error("Ro‘yxatdan o‘tishda xatolik:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 px-4 font-[Inter]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter', sans-serif; }
        `}
      </style>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600">
          Ro‘yxatdan o‘tish
        </h2>
        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Ism va Familya
            </label>
            <input
              type="text"
              placeholder="Ism va Familya"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Parol
            </label>
            <input
              type="password"
              placeholder="Parol"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Ro‘yxatdan o‘tish
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Akkauntingiz bormi?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-indigo-600 hover:underline font-medium"
          >
            Tizimga kirish
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
