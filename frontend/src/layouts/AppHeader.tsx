import { Bell } from 'lucide-react';
import { mockData } from '../data/mockData';

export const AppHeader: React.FC = () => {
  const { user } = mockData;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 sticky top-0 z-10">
      <div className="flex items-center gap-6">
        {/* XP Badge */}
        <div className="flex items-center gap-2 bg-accent-300/20 px-3 py-1.5 rounded-full">
          <div className="w-4 h-4 rounded-full bg-accent-500 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">XP</span>
          </div>
          <span className="font-semibold text-accent-500 text-sm">
            XP: {user.currentXp.toLocaleString()}
          </span>
        </div>

        {/* Notification Bell */}
        <button className="text-gray-400 hover:text-gray-600 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Avatar */}
        <button className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-primary-500 transition-colors">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};
