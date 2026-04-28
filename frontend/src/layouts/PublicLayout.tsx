import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../utils/routes';
import { ThemeToggle } from '../components/ThemeToggle';
import gerakBicaraLogo from '../assets/gerakbicara.png';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[color:var(--border)] px-6 py-5 flex flex-col gap-4 items-center justify-between lg:flex-row">
        <Link to={ROUTES.landing} className="flex items-center gap-3 text-xl font-semibold tracking-tight text-[var(--text)]">
          <img src={gerakBicaraLogo} alt="Gerak Bicara" className="h-8 w-auto object-contain" />
          Gerak Bicara
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <ThemeToggle />
          <Link to={ROUTES.login} className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[var(--text)] hover:bg-[#d6e8f5]/60 transition">
            Login
          </Link>
          <Link to={ROUTES.register} className="rounded-full bg-[#1e71b7] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:brightness-110 transition">
            Register
          </Link>
        </div>
      </header>

      <main className="px-6 py-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};
