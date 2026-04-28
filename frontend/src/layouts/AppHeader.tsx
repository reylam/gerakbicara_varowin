import { Bell } from 'lucide-react';
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
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <ThemeToggle />
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text)] shadow-sm shadow-slate-950/10">
            <span className="rounded-full bg-indigo-500 px-2 py-1 text-xs uppercase tracking-[0.25em] text-white">XP</span>
            <span>{user?.xp ?? 0}</span>
          </div>
          <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[var(--surface)] text-[var(--text)] transition hover:bg-white/5">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[var(--surface)]" />
          </button>
        </div>
      </div>
    </header>
  );
};
