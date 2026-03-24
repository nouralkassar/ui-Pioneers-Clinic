import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Mail, Lock, Shield } from 'lucide-react';

export function PioneersLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowOTP(true);
      // في التطبيق الحقيقي، سيتم إرسال OTP إلى البريد الإلكتروني
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      
      // تحديد نوع المستخدم بناءً على البريد الإلكتروني
      if (email.includes('admin') || email.includes('super')) {
        localStorage.setItem('isSuperDoctor', 'true');
        navigate('/super-dashboard');
      } else {
        localStorage.setItem('isSuperDoctor', 'false');
        navigate('/doctor-dashboard');
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: 'linear-gradient(135deg, #1A1F2B 0%, #2E7DBC 100%)'
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ backgroundColor: 'var(--color-primary-blue)' }}
          >
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">عيادة رواد الاستشارية</h1>
          <p className="text-gray-300">نظام إدارة طبي متقدم</p>
        </div>

        {/* Login Card */}
        <div 
          className="bg-white p-8"
          style={{ 
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)'
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6" style={{ color: 'var(--color-primary-blue)' }} />
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--color-deep-navy)' }}>
              تسجيل الدخول الآمن
            </h2>
          </div>
          
          {!showOTP ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              {/* Email */}
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--color-deep-navy)' }}
                >
                  البريد الإلكتروني الطبي
                </label>
                <div className="relative">
                  <Mail 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@pioneers.com"
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 focus:outline-none focus:ring-2"
                    style={{ 
                      borderRadius: 'var(--radius-md)',
                      '--tw-ring-color': 'var(--color-primary-blue)'
                    } as any}
                    required
                  />
                </div>
              </div>

              {/* Info Box */}
              <div 
                className="p-3 rounded-lg flex items-start gap-2"
                style={{ 
                  backgroundColor: '#E3F2FD',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <Shield className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-primary-blue)' }} />
                <p className="text-xs text-gray-700">
                  سيتم إرسال رمز التحقق (OTP) إلى بريدك الإلكتروني المسجل
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 text-white font-medium transition-all"
                style={{ 
                  backgroundColor: 'var(--color-primary-blue)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-dark-blue)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary-blue)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                إرسال رمز التحقق
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email (Read-only) */}
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--color-deep-navy)' }}
                >
                  البريد الإلكتروني
                </label>
                <div 
                  className="px-4 py-3 bg-gray-50 border border-gray-300"
                  style={{ borderRadius: 'var(--radius-md)' }}
                >
                  <p className="text-sm text-gray-700">{email}</p>
                </div>
              </div>

              {/* OTP */}
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--color-deep-navy)' }}
                >
                  رمز التحقق (OTP)
                </label>
                <div className="relative">
                  <Lock 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                  />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="أدخل الرمز المكون من 6 أرقام"
                    maxLength={6}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 text-center tracking-widest text-lg font-semibold"
                    style={{ 
                      borderRadius: 'var(--radius-md)',
                      '--tw-ring-color': 'var(--color-primary-blue)'
                    } as any}
                    required
                  />
                </div>
              </div>

              {/* Success Box */}
              <div 
                className="p-3 rounded-lg flex items-start gap-2"
                style={{ 
                  backgroundColor: '#E8F5E9',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <Shield className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
                <p className="text-xs text-gray-700">
                  تم إرسال رمز التحقق إلى بريدك الإلكتروني بنجاح
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full py-3 text-white font-medium transition-all"
                  style={{ 
                    backgroundColor: 'var(--color-primary-blue)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-dark-blue)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-blue)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  تسجيل الدخول
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowOTP(false)}
                  className="w-full py-3 border-2 font-medium transition-all"
                  style={{ 
                    borderColor: 'var(--color-primary-blue)',
                    color: 'var(--color-primary-blue)',
                    borderRadius: 'var(--radius-md)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(46, 125, 188, 0.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  تغيير البريد الإلكتروني
                </button>
              </div>

              {/* Resend Link */}
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-primary-blue)' }}
                  onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  إعادة إرسال الرمز
                </button>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              نظام آمن ومشفر - للاستخدام الطبي المصرح فقط
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">
            © 2026 عيادة رواد الاستشارية. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </div>
  );
}
