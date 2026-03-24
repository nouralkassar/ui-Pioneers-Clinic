import { Bell, Search } from 'lucide-react';
import { doctorInfo } from '../data/mockDataAr';

export function NavbarAr() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Doctor Profile - Right side in RTL */}
      <div className="flex items-center gap-4">
        {/* Doctor Profile */}
        <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold">أع</span>
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">{doctorInfo.name}</div>
            <div className="text-xs text-gray-500">{doctorInfo.specialty}</div>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* Search - Left side in RTL */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="البحث عن المرضى، المواعيد..."
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
