import { Search, Bell, Settings } from 'lucide-react';

export function PioneersTopBar() {
  return (
    <div 
      className="h-16 bg-white flex items-center justify-between px-6"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search 
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
          <input
            type="text"
            placeholder="البحث عن المرضى، السجلات، البروتوكولات..."
            className="w-full pr-10 pl-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 transition-all"
            style={{ 
              borderRadius: 'var(--radius-md)',
              '--tw-ring-color': 'var(--color-primary-blue)'
            } as any}
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button 
          className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          style={{ borderRadius: 'var(--radius-md)' }}
        >
          <Bell className="w-6 h-6 text-gray-600" />
          <span 
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-error)' }}
          ></span>
        </button>

        {/* Settings */}
        <button 
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          style={{ borderRadius: 'var(--radius-md)' }}
        >
          <Settings className="w-6 h-6 text-gray-600" />
        </button>

        {/* Profile Info */}
        <div className="flex items-center gap-3 pr-3 border-r border-gray-200">
          <div className="text-right">
            <div className="text-sm font-medium" style={{ color: 'var(--color-deep-navy)' }}>
              د. أميرة العلي
            </div>
            <div className="text-xs text-gray-500">طبيب أورام</div>
          </div>
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-primary-blue)' }}
          >
            <span className="text-white font-semibold">أع</span>
          </div>
        </div>
      </div>
    </div>
  );
}
