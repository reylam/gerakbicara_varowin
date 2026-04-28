import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSigns, searchSigns } from '../api/signPedia';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useDebounce } from '../hooks/useDebounce';

interface SignItem {
  id: number;
  word: string;
  description: string;
  category: string;
  model_3d_url?: string;
}

export const SignPedia: React.FC = () => {
  const [query, setQuery] = useState('');
  const [signs, setSigns] = useState<SignItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const debouncedQuery = useDebounce(query, 450);

  useEffect(() => {
    const fetch = debouncedQuery ? searchSigns(debouncedQuery) : getSigns();
    setLoading(true);
    setError('');

    fetch
      .then((response) => {
        if (response.data.success) {
          setSigns(response.data.data.data ?? response.data.data);
        }
      })
      .catch(() => setError('Gagal memuat daftar sign.'))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">SignPedia</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Telusuri gerakan bahasa isyarat.</h2>
          </div>
          <label className="relative block w-full max-w-sm">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kata kunci..."
              className="w-full rounded-full border border-slate-700/70 bg-slate-900/80 px-5 py-3 text-white outline-none transition focus:border-indigo-500/70"
            />
          </label>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-center text-slate-300">{error}</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {signs.length ? (
            signs.map((sign) => (
              <motion.article
                key={sign.id}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-6 shadow-lg shadow-slate-950/10 transition"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{sign.category}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{sign.word}</h3>
                  </div>
                  <div className="rounded-2xl bg-indigo-500/10 px-3 py-1 text-xs text-indigo-200">Sign</div>
                </div>
                <p className="text-slate-300 leading-7">{sign.description}</p>
                {sign.model_3d_url && (
                  <p className="mt-4 text-sm text-slate-400">Model 3D tersedia</p>
                )}
              </motion.article>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-8 text-center text-slate-400">
              Tidak ada sign yang cocok. Coba kata kunci lain.
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
