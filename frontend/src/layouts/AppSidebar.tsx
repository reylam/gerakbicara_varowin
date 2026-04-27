import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, BookOpen, Dumbbell, BarChart2, User } from 'lucide-react';
import gerakBicaraLogo from '../assets/gerakbicara.png';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'SignPath', path: '/signpath', icon: Map },
  { name: 'SignPedia', path: '/signpedia', icon: BookOpen },
  { name: 'Challenge', path: '/challenge', icon: Dumbbell },
  { name: 'Leaderboard', path: '/leaderboard', icon: BarChart2 },
  { name: 'Profile', path: '/profile', icon: User },
];

export const AppSidebar: React.FC = () => {
  return(
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <img src={gerakBicaraLogo} alt="Gerak Bicara" className="h-10 w-auto object-contain" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${ 
                isActive 
                  ? 'bg-primary-100 text-primary-800'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
