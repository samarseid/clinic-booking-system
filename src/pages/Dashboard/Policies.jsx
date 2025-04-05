import { useNavigate } from "react-router-dom";

const Policies = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-6">
      <div className="max-w-5xl mx-auto">


        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Platforma Siyosatlari
        </h1>
        <p className="text-center text-gray-600 text-lg mb-12">
          Foydalanuvchilar uchun muhim qoidalar va shartlar bilan tanishing.
        </p>

        {/* Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Policy 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border-t-4 border-teal-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Maxfiylik siyosati
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Sizning ma’lumotlaringiz biz uchun muhim.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Biz foydalanuvchilarning shaxsiy ma’lumotlarini ehtiyotkorlik bilan saqlaymiz va hech qachon uchinchi tomonlarga bermaymiz. Ma’lumotlar faqat tizim funksionalligini ta’minlash uchun ishlatiladi.
            </p>
          </div>

          {/* Policy 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border-t-4 border-indigo-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. Xizmat shartlari
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Platformadan foydalanish shartlariga rozilik.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Har bir foydalanuvchi platformadan foydalanish orqali xizmat ko‘rsatish shartlariga avtomatik tarzda rozilik bildiradi. Har qanday noqonuniy faoliyat yoki noto‘g‘ri ma’lumot taqiqlanadi.
            </p>
          </div>

          {/* Policy 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border-t-4 border-rose-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Uchrashuvlar siyosati
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Bekor qilish qoidalari va ogohlantirishlar.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Uchrashuvni bekor qilish kerak bo‘lsa, bu haqda kamida 24 soat oldin xabar berilishi lozim. Aks holda, ushbu foydalanuvchi tizim tomonidan ogohlantiriladi yoki profilga ta’sir qilishi mumkin.
            </p>
          </div>

          {/* Policy 4 - optional/news */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition border-t-4 border-yellow-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Yangilanishlar va xabarnomalar
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Siz har doim yangiliklardan xabardor bo‘lasiz.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Biz vaqti-vaqti bilan tizimga yangilanishlar kiritamiz. Foydalanuvchilar bu haqda xabarnoma orqali ogohlantiriladi. Har bir o‘zgarish siyosatlar sahifasida e’lon qilinadi.
            </p>
          </div>
        </div>

        {/* Footer action */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition text-lg font-medium shadow-md"
          >
            Asosiy Sahifaga qaytish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Policies;
