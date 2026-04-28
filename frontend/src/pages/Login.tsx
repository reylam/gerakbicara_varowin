import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../utils/routes';
import { getApiErrorMessage } from '../utils/apiError';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(form);
      if (response.data.success) {
        setToken(response.data.data.token);
        setUser(response.data.data.user);
        navigate(ROUTES.dashboard, { replace: true });
      }
    } catch (error: unknown) {
      setError(getApiErrorMessage(error, 'Gagal login, periksa input Anda.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-lg rounded-[32px] border border-[color:var(--border)] bg-[var(--surface)] p-10 shadow-2xl shadow-slate-950/10"
    >
      <h1 className="text-3xl font-bold text-[var(--text)]">Masuk ke Gerak Bicara</h1>
      <p className="mt-3 text-[var(--muted)]">Akses jalur pembelajaran, kuis, dan simulasi gesture 3D.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <label className="block text-sm text-[var(--text)]">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-2 w-full rounded-3xl border border-[color:var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[#1e71b7]"
            placeholder="nama@domain.com"
            required
          />
        </label>

        <label className="block text-sm text-[var(--text)]">
          Password
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-2 w-full rounded-3xl border border-[color:var(--border)] bg-[var(--bg)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[#1e71b7]"
            placeholder="••••••••"
            required
          />
        </label>

        {error && <p className="rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-3xl bg-[#1e71b7] px-5 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? 'Memuat...' : 'Masuk'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        Belum punya akun?{' '}
        <Link to={ROUTES.register} className="font-semibold text-[#1e71b7] hover:brightness-110">
          Daftar sekarang
        </Link>
      </p>
    </motion.section>
  );
};
