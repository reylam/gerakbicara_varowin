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
    return <p className="text-center text-slate-300">{error || 'Data tidak tersedia.'}</p>;
  }

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]"
      >
        <div className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/20">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">Dashboard</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Selamat belajar kembali.</h2>
            </div>
            <div className="rounded-3xl bg-slate-900 px-4 py-3 text-sm text-slate-300">Status terkini</div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: 'XP', value: stats.xp },
              { label: 'Level', value: stats.level },
              { label: 'Streak', value: `${stats.streak.current} hari` },
            ].map((card) => (
              <div key={card.label} className="rounded-3xl border border-slate-700/50 bg-slate-900/80 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{card.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-slate-950/70 to-sky-500/10 p-6 border border-indigo-500/10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Tantangan</p>
                <h3 className="mt-3 text-2xl font-bold text-white">Tetap konsisten hari ini</h3>
              </div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/80">
                {stats.streak.longest} hari terpanjang
              </span>
            </div>
            <p className="mt-4 text-slate-300">Terakhir aktif: {stats.streak.last_active_date ?? 'belum tersedia'}</p>
          </div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/10"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">Ringkasan</p>
            <h3 className="mt-4 text-xl font-semibold text-white">Pelajaran terbaru</h3>
            <div className="mt-6 space-y-4">
              {stats.recent_completed_lessons.length ? (
                stats.recent_completed_lessons.map((item) => (
                  <div key={item.lesson.id} className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-400">{item.lesson.module.title}</p>
                    <p className="mt-1 text-white">{item.lesson.title}</p>
                    <p className="mt-2 text-xs text-slate-500">Selesai: {new Date(item.completed_at).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">Belum ada pelajaran yang selesai.</p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};
