import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getDashboardStats } from '../api/dashboard';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface DashboardStats {
  xp: number;
  level: number;
  streak: { current: number; longest: number; last_active_date?: string };
  recent_completed_lessons: Array<{ lesson: { id: number; title: string; module: { title: string } }; completed_at: string }>;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboardStats()
      .then((response) => {
        if (response.data.success) {
          setStats(response.data.data);
        }
      })
      .catch(() => {
        setError('Tidak dapat memuat statistik dashboard sekarang.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !stats) {
    return <p className="text-center text-[var(--muted)]">{error || 'Data tidak tersedia.'}</p>;
  }

  return (
    <div className="space-y-8">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="gb-card p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#4a7c8e]">Dashboard</p>
              <h2 className="mt-3 text-3xl font-bold text-[var(--text)]">Selamat belajar kembali.</h2>
            </div>
            <div className="rounded-3xl bg-[#fff7e6] px-4 py-3 text-sm text-[#a16e16]">XP: {stats.xp}</div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'XP', value: stats.xp },
              { label: 'Level', value: stats.level },
              { label: 'Streak', value: `${stats.streak.current} hari` },
            ].map((card) => (
              <div key={card.label} className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg)] p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">{card.label}</p>
                <p className="mt-3 text-3xl font-semibold text-[var(--text)]">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-[#d6e8f5] bg-gradient-to-r from-[#2c7cc0] to-[#1e71b7] p-6 text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Materi Terakhir</p>
                <h3 className="mt-3 text-3xl font-bold">Modul Berjalan</h3>
              </div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white">
                {stats.streak.current}% selesai
              </span>
            </div>
            <p className="mt-4 text-white/80">Terakhir aktif: {stats.streak.last_active_date ?? 'belum tersedia'}</p>
          </div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="gb-card p-6"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#4a7c8e]">Ringkasan</p>
            <h3 className="mt-4 text-xl font-semibold text-[var(--text)]">Tantangan Harian</h3>
            <div className="mt-6 space-y-4">
              {stats.recent_completed_lessons.length ? (
                stats.recent_completed_lessons.map((item) => (
                  <div key={item.lesson.id} className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg)] p-4">
                    <p className="text-sm text-[var(--muted)]">{item.lesson.module.title}</p>
                    <p className="mt-1 text-[var(--text)]">{item.lesson.title}</p>
                    <p className="mt-2 text-xs text-[#a16e16]">+50 XP</p>
                  </div>
                ))
              ) : (
                <p className="text-[var(--muted)]">Belum ada pelajaran yang selesai.</p>
              )}
            </div>
          </motion.div>
          <div className="gb-card p-6">
            <h3 className="text-xl font-semibold text-[var(--text)]">Koleksi Lencana</h3>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {['Salam', 'Abjad', 'Keluarga', 'Emosi'].map((badge) => (
                <div key={badge} className="rounded-2xl border border-[color:var(--border)] bg-[var(--bg)] p-3 text-center text-xs text-[var(--muted)]">
                  <div className="mx-auto mb-2 h-8 w-8 rounded-full border-2 border-[#1e71b7]" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
