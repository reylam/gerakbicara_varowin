import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, BookOpen, Dumbbell, BarChart2, User, LogOut } from 'lucide-react';
import { FiHome } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../utils/routes';
import { logout as logoutRequest } from '../api/auth';
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

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch {
      // Local logout should always continue even if API call fails.
    }
    logout();
    navigate('/', { replace: true });
  };

  return (
    <>
      <aside className="fixed left-0 top-0 z-20 hidden h-screen w-72 flex-col border-r border-[color:var(--border)] bg-[var(--surface)] px-6 py-6 shadow-lg lg:flex">
        <div className="mb-10 flex items-center gap-3">
          <img src={gerakBicaraLogo} alt="Gerak Bicara" className="h-10 w-auto object-contain" />
          <span className="text-lg font-bold text-[var(--text)]">Gerak Bicara</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[#d6e8f5] text-[#1e71b7]'
                    : 'text-[var(--muted)] hover:bg-[#d6e8f5]/70 hover:text-[var(--text)]'
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
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:brightness-95"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t border-[color:var(--border)] bg-[var(--surface)] px-2 py-2 lg:hidden">
        {navItems.slice(0, 5).map((item, index) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-medium ${
                isActive ? 'text-[#1e71b7]' : 'text-[var(--muted)]'
              }`
            }
          >
            {index === 0 ? <FiHome className="h-4 w-4" /> : <item.icon className="h-4 w-4" />}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </>
  );
};
