import { Bell, Flame, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useAuthStore } from '../store/authStore';
import { ThemeToggle } from '../components/ThemeToggle';

export const AppHeader: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-10 border-b border-[color:var(--border)] bg-[var(--surface)]/95 px-6 py-4 backdrop-blur-xl shadow-sm shadow-slate-950/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Selamat Datang</p>
          <h1 className="mt-2 text-2xl font-semibold text-[var(--text)]">{user?.name ?? 'Pengguna'}</h1>
          <p className="mt-1 text-xs text-[var(--muted)]">{format(new Date(), 'EEEE, d MMMM yyyy', { locale: id })}</p>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
            <div className="inline-flex items-center rounded-full 
                            border border-orange-200/60 
                            bg-orange-50/60 
                            px-3 py-1.5 
                            text-sm font-semibold 
                            text-orange-600
                            dark:bg-orange-950/30 
                            dark:border-orange-800/40 
                            dark:text-orange-300">
              <Flame className="w-4 h-4 mr-1.5" />
              <span>{(user as any)?.streak ?? 7}</span>
            </div>
            <div className="inline-flex items-center rounded-full 
                            border border-amber-200/0 
                            bg-amber-50/0
                            px-3 py-1.5 
                            text-sm font-semibold 
                            text-amber-700
                            dark:bg-amber-950/30 
                            dark:border-amber-800/40 
                            dark:text-amber-300">
              <Zap className="w-4 h-4 mr-1.5" />
              <span>{user?.xp ? user.xp.toLocaleString() + ' XP' : '1,250 XP'}</span>
            </div>
            <button className="relative p-2 rounded-full text-white transition bg-[#1e71b7] hover:bg-[#1a5fa0] dark:bg-[#2980c9] dark:hover:bg-[#3d92db]">
              <Bell className="w-5 h-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[var(--surface)]" />
            </button>
        </div>
      </div>
    </header>
  );
};
