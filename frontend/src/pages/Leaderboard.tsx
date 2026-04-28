import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getLeaderboard } from '../api/leaderboard';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface LeaderboardEntry {
  rank: number;
  id: number;
  name: string;
  xp: number;
  level: number;
}

export const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getLeaderboard()
      .then((response) => {
        if (response.data.success) {
          const payload = response.data.data.leaderboard?.entries ?? response.data.data;
          setEntries(payload);
        }
      })
      .catch(() => setError('Gagal memuat leaderboard.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-8 shadow-xl shadow-slate-950/10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#4a7c8e]">Leaderboard</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--text)]">Ranking pengguna teratas</h2>
          </div>
          <p className="max-w-xl text-[var(--muted)]">Lihat siapa yang memimpin papan peringkat dan raih XP lebih banyak dengan latihan harian.</p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-center text-[var(--muted)]">{error}</p>
      ) : (
        <div className="grid gap-4">
          {entries.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-6 shadow-lg shadow-slate-950/10"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-[var(--muted)]">Rank {user.rank}</p>
                  <h3 className="mt-1 text-2xl font-semibold text-[var(--text)]">{user.name}</h3>
                  <p className="mt-2 text-[var(--muted)]">Level {user.level} • {user.xp} XP</p>
                </div>
                <div className="rounded-3xl bg-[#1e71b7] px-4 py-2 text-sm font-semibold text-white">
                  #{user.rank}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
