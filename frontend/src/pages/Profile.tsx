import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProfile, updateProfile } from '../api/profile';
import { useAuthStore } from '../store/authStore';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Profile: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    getProfile()
      .then((response) => {
        if (response.data.success) {
          const user = response.data.data.user;
          setForm({ name: user.name ?? '', email: user.email ?? '' });
        }
      })
      .catch(() => setError('Gagal memuat profil Anda.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const response = await updateProfile({ name: form.name, email: form.email });
      if (response.data.success) {
        setMessage('Profil berhasil diperbarui.');
        setUser(response.data.data.user);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Gagal menyimpan profil.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">Profil</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Kelola akun Anda</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="block rounded-3xl border border-slate-700/60 bg-slate-900/80 p-4">
          <span className="text-sm text-slate-400">Nama</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-3 w-full bg-transparent text-white outline-none"
            required
          />
        </label>
        <label className="block rounded-3xl border border-slate-700/60 bg-slate-900/80 p-4">
          <span className="text-sm text-slate-400">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-3 w-full bg-transparent text-white outline-none"
            required
          />
        </label>
        <div className="sm:col-span-2 space-y-4">
          {message && <div className="rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-200">{message}</div>}
          {error && <div className="rounded-3xl bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110 disabled:opacity-60"
          >
            {saving ? 'Menyimpan...' : 'Perbarui Profil'}
          </button>
        </div>
      </form>
    </motion.section>
  );
};
