import { useState, useEffect } from 'react';
import { 
  Beaker, Calculator, CheckCircle, 
  AlertTriangle, Save, Info, Activity, ArrowLeft
} from 'lucide-react';

interface Protocol {
  id: string;
  name: string;
  baseDose: number;
  description: string;
}

const protocols: Protocol[] = [
  { id: 'P1', name: 'بروتوكول العلاج الكيماوي (AC)', baseDose: 60, description: 'يستخدم لعلاج حالات سرطان الثدي المتقدمة ويفضل مراقبة وظائف القلب.' },
  { id: 'P2', name: 'بروتوكول سيسبلاتين (Cisplatin)', baseDose: 75, description: 'علاج مكثف يعتمد على كفاءة الكلى ونسبة الإرواء للمريض.' },
  { id: 'P3', name: 'بروتوكول فلوروراسيل (5-FU)', baseDose: 400, description: 'جرعة أساسية للجهاز الهضمي، تعطى عادة عبر التسريب الوريدي المستمر.' },
];

export function TreatmentProtocols() {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [bsa, setBsa] = useState<number>(0);
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const [calculatedDose, setCalculatedDose] = useState<number>(0);

  useEffect(() => {
    if (weight > 0 && height > 0) {
      const bsaValue = Math.sqrt((height * weight) / 3600);
      setBsa(parseFloat(bsaValue.toFixed(2)));
    } else {
      setBsa(0);
    }
  }, [weight, height]);

  useEffect(() => {
    if (selectedProtocol && bsa > 0) {
      setCalculatedDose(parseFloat((selectedProtocol.baseDose * bsa).toFixed(2)));
    }
  }, [selectedProtocol, bsa]);

  return (
    // أضفنا خلفية بلون #F1F5F9 (رمادي فاتح جداً) لتمييز الكروت البيضاء
    <div className="p-6 md:p-10 space-y-8 font-['Cairo'] text-right  min-h-screen" dir="rtl">
      
      {/* الترويسة المحسنة */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-lg shadow-emerald-200">
            <Beaker className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#25527E]">حساب بروتوكولات العلاج</h1>
            <p className="text-gray-400 font-bold text-xs flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-500" /> نظام الحساب الآلي المعتمد على BSA
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
           <span className="text-emerald-700 font-black text-sm">الحالة: متصل بالنظام الطبي</span>
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* الجانب الأيمن: المدخلات */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white relative overflow-hidden">
            <h3 className="font-black text-[#25527E] mb-8 flex items-center gap-2 text-lg">
              <Calculator className="w-6 h-6 text-blue-500" />
              البيانات الحيوية
            </h3>
            
            <div className="space-y-6 relative z-10">
              <div className="group">
                <label className="block text-xs font-black text-gray-500 mb-2 mr-1 group-focus-within:text-blue-600 transition-colors">الوزن الحالي (kg)</label>
                <input 
                  type="number" 
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-200 focus:bg-white outline-none font-black text-[#25527E] transition-all shadow-inner"
                  placeholder="00.0"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-black text-gray-500 mb-2 mr-1 group-focus-within:text-blue-600 transition-colors">الطول القائم (cm)</label>
                <input 
                  type="number" 
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full p-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-200 focus:bg-white outline-none font-black text-[#25527E] transition-all shadow-inner"
                  placeholder="000"
                />
              </div>
            </div>

            {/* عرض BSA بشكل بارز */}
            <div className="mt-10 p-6 bg-gradient-to-l from-blue-600 to-[#25527E] rounded-[2rem] text-center shadow-lg shadow-blue-200 relative overflow-hidden">
              <p className="text-[10px] font-black text-blue-100 uppercase tracking-[0.2em] mb-1 relative z-10">مساحة سطح الجسم المحسوبة</p>
              <div className="text-5xl font-black text-white relative z-10">
                {bsa} <span className="text-lg opacity-50">m²</span>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            </div>
          </div>
        </div>

        {/* الجانب الأيسر: الاختيار والنتائج */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {protocols.map((p) => (
              <div 
                key={p.id}
                onClick={() => setSelectedProtocol(p)}
                className={`p-6 rounded-[2.2rem] border-2 transition-all cursor-pointer relative ${
                  selectedProtocol?.id === p.id 
                  ? 'bg-white border-emerald-500 shadow-2xl shadow-emerald-100 translate-y-[-4px]' 
                  : 'bg-white border-white hover:border-gray-200 shadow-md opacity-80'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className={`p-3 rounded-xl ${selectedProtocol?.id === p.id ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'bg-gray-100 text-gray-400'}`}>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-lg ${selectedProtocol?.id === p.id ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-400'}`}>
                    {p.baseDose} mg/m²
                  </span>
                </div>
                <h4 className="font-black text-[#25527E] text-md mb-2">{p.name}</h4>
                <p className="text-[11px] text-gray-400 font-bold leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>

          {/* الكرت النهائي للجرعة - تصميم متباين جداً */}
          <div className={`p-10 rounded-[3rem] transition-all duration-700 relative overflow-hidden border-4 ${
            selectedProtocol ? 'bg-white border-[#25527E] shadow-2xl' : 'bg-gray-200/50 border-dashed border-gray-300 opacity-60'
          }`}>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-center md:text-right">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                   <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
                   <h2 className="text-xl font-black text-[#25527E]">الجرعة النهائية المعتمدة</h2>
                </div>
                <p className="text-sm font-bold text-gray-400">البروتوكول: {selectedProtocol?.name || 'انتظار الاختيار...'}</p>
              </div>

              <div className="bg-[#25527E] p-8 rounded-[2.5rem] min-w-[240px] text-center shadow-2xl shadow-blue-900/40">
                <div className="text-6xl font-black text-white tracking-tighter">
                  {calculatedDose}
                </div>
                <div className="text-emerald-400 font-black text-xl mt-1 uppercase tracking-widest">Milligrams</div>
              </div>

              <button 
                disabled={!selectedProtocol || calculatedDose === 0}
                className="group px-10 py-5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white rounded-[2rem] font-black shadow-xl shadow-emerald-200 transition-all flex items-center gap-3 hover:scale-105"
              >
                <Save className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                تأكيد واعتماد
              </button>
            </div>
          </div>

          {/* التنبيه الذكي */}
          {calculatedDose > 1000 && (
            <div className="bg-red-50 border-2 border-red-100 p-6 rounded-[2rem] flex items-center gap-5 shadow-lg shadow-red-100 animate-pulse">
              <div className="p-3 bg-red-500 rounded-2xl shadow-lg shadow-red-200">
                <AlertTriangle className="text-white w-8 h-8" />
              </div>
              <div>
                <h5 className="text-red-800 font-black text-lg">تنبيه السمية الدوائية!</h5>
                <p className="text-red-600 text-sm font-bold">الجرعة المحسوبة ({calculatedDose}mg) تتجاوز الحدود الآمنة. يرجى مراجعة بيانات المريض فوراً.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}