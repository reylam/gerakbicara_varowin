import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, BookOpen, Dumbbell, BarChart2, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../utils/routes';
import gerakBicaraLogo from '../assets/gerakbicara.png';

const navItems = [
  { name: 'Dashboard', path: ROUTES.dashboard, icon: LayoutDashboard },
  { name: 'SignPath', path: ROUTES.signPath, icon: Map },
  { name: 'SignPedia', path: ROUTES.signPedia, icon: BookOpen },
  { name: 'Challenge', path: ROUTES.challenge, icon: Dumbbell },
  { name: 'Leaderboard', path: ROUTES.leaderboard, icon: BarChart2 },
  { name: 'Profile', path: ROUTES.profile, icon: User },
];

export const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950/95 px-6 py-6 shadow-lg shadow-slate-950/20 backdrop-blur-xl">
      <div className="mb-10 flex items-center gap-3">
        <img src={gerakBicaraLogo} alt="Gerak Bicara" className="h-10 w-auto object-contain" />
        <span className="text-lg font-bold text-white">Gerak Bicara</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? 'bg-indigo-500/15 text-white shadow-sm shadow-indigo-500/10'
                  : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-900"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </aside>
  );
};
