import { createClient } from "@supabase/supabase-js";

// Supabase URL va anon keyni oling (Vite .env faylidan)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase clientini yaratish
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Foydalanuvchini ro'yxatdan o'tkazish
export const signUp = async (fullName, email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName } },
  });

  if (error) throw error;
  return user;
};

// Foydalanuvchini tizimga kirish
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("❌ Tizimga kirishda xatolik:", error.message);
    throw error;
  }

  if (!data.session) {
    console.error("❌ Session mavjud emas! (Supabase noto‘g‘ri ma’lumot qaytardi)");
    throw new Error("Session mavjud emas!");
  }

  // Tokenni localStorage'ga saqlash
  localStorage.setItem("token", data.session.access_token);
  return data.session;
};

// Foydalanuvchini tizimdan chiqish
export const signOut = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("token");
};

// Foydalanuvchi profilini yangilash
export const updateUserProfile = async (updatedUser) => {
  const { data, error } = await supabase
    .from("users") // "users" deb nomlangan jadvalda saqlanayotgan ma'lumotlar
    .update({
      fullName: updatedUser.fullName, // Yangilanishi kerak bo'lgan foydalanuvchi ismi
    })
    .eq("email", updatedUser.email); // Email orqali foydalanuvchini aniqlash

  if (error) {
    console.error("❌ Profilni yangilashda xatolik:", error.message);
    throw error;
  }

  return data;
};
