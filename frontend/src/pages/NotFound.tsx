import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../utils/routes';

export const NotFound: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
    >
      <span className="text-6xl font-black text-indigo-400">404</span>
      <h1 className="mt-4 text-3xl font-semibold text-white">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-slate-300 max-w-md">
        Sepertinya kamu tersesat di rute yang salah. Kembali ke dashboard untuk melanjutkan latihan.
      </p>
      <Link
        to={ROUTES.dashboard}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 transition"
      >
        Kembali ke Dashboard
      </Link>
    </motion.section>
  );
};
