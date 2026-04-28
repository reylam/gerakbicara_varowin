import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { register } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../utils/routes';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await register(form);
      if (response.data.success) {
        setToken(response.data.data.token);
        setUser(response.data.data.user);
        navigate(ROUTES.dashboard, { replace: true });
      }
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Gagal mendaftar, periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-lg rounded-[32px] border border-white/10 bg-slate-950/90 p-10 shadow-2xl shadow-slate-950/40"
    >
      <h1 className="text-3xl font-bold text-white">Daftar Akun Baru</h1>
      <p className="mt-3 text-slate-400">Bergabung dan mulai pelajari SignPath serta tantangan interaktif.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block text-sm text-slate-300">
          Nama Lengkap
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500/70"
            placeholder="Nama Anda"
            required
          />
        </label>

        <label className="block text-sm text-slate-300">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500/70"
            placeholder="nama@domain.com"
            required
          />
        </label>

        <label className="block text-sm text-slate-300">
          Password
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500/70"
            placeholder="••••••••"
            required
          />
        </label>

        {error && <p className="rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-3xl bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? 'Mendaftarkan akun...' : 'Daftar Sekarang'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Sudah punya akun?{' '}
        <Link to={ROUTES.login} className="font-semibold text-white hover:text-indigo-300">
          Masuk di sini
        </Link>
      </p>
    </motion.section>
  );
};
