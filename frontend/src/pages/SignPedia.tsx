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

const categoryTabs = ['All Gestures', 'Alphabet', 'Basic Words', 'Common Phrases', 'Numbers'];

export const SignPedia: React.FC = () => {
  const [query, setQuery] = useState('');
  const [signs, setSigns] = useState<SignItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('All Gestures');
  const debouncedQuery = useDebounce(query, 450);

  useEffect(() => {
    const fetch = debouncedQuery ? searchSigns(debouncedQuery) : getSigns();

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
      <div className="gb-card p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#4a7c8e]">SignPedia</p>
            <h2 className="mt-3 text-4xl font-bold text-[var(--text)]">SignPedia Library</h2>
            <p className="mt-2 max-w-xl text-[var(--muted)]">Discover and learn from our comprehensive dictionary of sign language gestures.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 md:flex-row">
          <label className="relative block w-full">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setLoading(true);
                setError('');
                setQuery(e.target.value);
              }}
              placeholder="Search for words, letters, or phrases..."
              className="w-full rounded-2xl border border-[color:var(--border)] bg-[#fff] px-5 py-3 text-[var(--text)] outline-none transition focus:border-[#1e71b7]"
            />
          </label>
          <button type="button" className="rounded-2xl bg-[#1e71b7] px-6 py-3 font-semibold text-white shadow-sm shadow-slate-900/10">
            Search
          </button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === tab ? 'bg-[#1e71b7] text-white' : 'border border-[color:var(--border)] bg-white text-[var(--muted)] hover:bg-[#d6e8f5]/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-center text-[var(--muted)]">{error}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {signs.length ? (
            signs.map((sign) => (
              <motion.article
                key={sign.id}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] shadow-lg shadow-slate-950/10 transition"
              >
                <div className="h-32 bg-gradient-to-br from-[#4a7c8e] to-[#475569]" />
                <div className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#4a7c8e]">{sign.category}</p>
                    <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">{sign.word}</h3>
                  </div>
                  <div className="rounded-2xl bg-[#d6e8f5] px-3 py-1 text-xs text-[#1e71b7]">Sign</div>
                </div>
                <p className="text-[var(--muted)] leading-7">{sign.description}</p>
                {sign.model_3d_url && (
                  <p className="mt-4 text-sm text-[var(--muted)]">Model 3D tersedia</p>
                )}
                <button type="button" className="mt-4 w-full rounded-xl bg-[#d6e8f5] py-2 text-sm font-semibold text-[#1e71b7]">
                  Latihan
                </button>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-8 text-center text-[var(--muted)]">
              Tidak ada sign yang cocok. Coba kata kunci lain.
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
