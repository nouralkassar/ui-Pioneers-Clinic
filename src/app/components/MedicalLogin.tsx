import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export function MedicalLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'login' | 'otp'>('login');
  // منطق الـ OTP المطور (6 خانات)
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) setStep('otp');
  };

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // انتقال تلقائي للمربع التالي
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    // العودة للمربع السابق عند المسح
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalOtp = otp.join('');
    if (finalOtp.length === 6) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      const lowerEmail = email.toLowerCase();

      if (lowerEmail.includes('amira') || lowerEmail.includes('admin')) {
        localStorage.setItem('userRole', 'super-doctor');
        navigate('/super-dashboard');
      } else if (lowerEmail.includes('noura') || lowerEmail.includes('sec')) {
        localStorage.setItem('userRole', 'secretary');
        navigate('/secretary-dashboard');
      } else {
        localStorage.setItem('userRole', 'doctor');
        navigate('/doctor-dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4 font-['Cairo'] relative overflow-hidden" dir="rtl">
      {/* الخلفية العامة */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/background.png" 
          alt="DNA Full Background"
          className="w-full h-full object-cover opacity-[0.12] pointer-events-none" 
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/40"></div>
      </div>

      {/* الحاوية الرئيسية */}
      <div className="bg-white/95 backdrop-blur-sm w-full max-w-4xl min-h-[600px] rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-white/50 relative z-10">
        
        {/* القسم الجانبي - تم استخدام درجة أزرق سماوي أغمق قليلاً وأكثر وضوحاً */}
        <div className="md:w-[42%] bg-[#DDEBFA] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden border-l border-[#25527E]/5">
          {/* تأثيرات ضوئية خلف اللوغو */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/30 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#25527E]/5 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col items-center w-full">
            {/* اللوغو الدائري */}
            <div className="bg-white p-1 rounded-full inline-block mb-4 shadow-[0_15px_35px_rgba(37,82,126,0.15)] border-[1.5px] border-[#25527E]/10 transition-transform hover:scale-105 duration-300">
              <div className="rounded-full overflow-hidden bg-white flex items-center justify-center w-36 h-36">
                <img 
                  src="/logo.jpg" 
                  alt="Pioneers Clinic Logo" 
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
            </div>

            <h1 className="text-[#25527E] text-2xl font-[800] mb-1 tracking-tight">عيادة الرواد الاستشارية</h1>
            <div className="mt-1">
              <h2 className="text-[#25527E] text-lg font-bold">Pioneers Clinic</h2>
              <p className="text-[#4A7299] text-[10px] font-bold tracking-widest uppercase opacity-75 mt-0.5">Visionary Medical Approach</p>
            </div>
            <div className="w-16 h-[2.5px] bg-[#25527E]/20 mt-6 rounded-full"></div>
          </div>
        </div>

        {/* قسم الفورم */}
        <div className="md:w-[58%] p-8 md:p-14 flex flex-col justify-center bg-white relative">
          <div className="max-w-sm mx-auto w-full">
            
            <h2 className="text-3xl font-[800] text-[#25527E] mb-10 text-center">
              {step === 'login' ? 'تسجيل الدخول' : 'رمز التحقق (OTP)'}
            </h2>

            {step === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#25527E] transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="البريد الإلكتروني"
                      className="w-full pr-12 pl-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#25527E]/5 focus:border-[#25527E] outline-none transition-all text-right font-[500] shadow-sm"
                      required
                    />
                  </div>
                  <div className="relative group">
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#25527E] transition-colors" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="كلمة المرور"
                      className="w-full pr-12 pl-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#25527E]/5 focus:border-[#25527E] outline-none transition-all text-right font-[500] shadow-sm"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#25527E] hover:bg-[#1a3a5a] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#25527E]/20 transition-all flex items-center justify-center gap-3 group">
                  <span>متابعة</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-[-5px] transition-transform rotate-180" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleOTPSubmit} className="space-y-8 animate-in zoom-in-95 duration-500">
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-500 font-[500]">أدخل الرمز المرسل إلى بريدك</p>
                  
                  <div className="flex justify-between gap-2 mt-6" dir="ltr">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        ref={(el) => { inputRefs.current[index] = el; }}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
className="w-12 h-14 border-2 border-gray-300 rounded-xl text-center text-2xl font-[900] text-[#25527E] focus:border-[#25527E] focus:ring-4 focus:ring-[#25527E]/10 outline-none transition-all bg-[#f8fafc] shadow-sm hover:border-gray-400"                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <button type="submit" className="w-full bg-[#25527E] hover:bg-[#1a3a5a] text-white font-bold py-4 rounded-2xl shadow-xl transition-all">
                    تأكيد الدخول
                  </button>
                  <button type="button" onClick={() => setStep('login')} className="w-full text-gray-400 text-sm font-bold hover:text-[#25527E] transition-colors">
                    رجوع لتعديل البيانات
                  </button>
                </div>
              </form>
            )}

            <div className="mt-16 text-center">
              <p className="text-[10px] text-gray-400 font-[800] uppercase tracking-widest">جميع الحقوق محفوظة عيادة الرواد الاستشارية 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}