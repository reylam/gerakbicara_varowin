import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPaths, getModulesByPath, getLessonsByModule } from '../api/signPath';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const SignPath: React.FC = () => {
  const [paths, setPaths] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [activePath, setActivePath] = useState<number | null>(null);
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPaths()
      .then((response) => {
        if (response.data.success) {
          setPaths(response.data.data);
        }
      })
      .catch(() => setError('Gagal memuat jalur pembelajaran.'))
      .finally(() => setLoading(false));
  }, []);

  const openPath = (pathId: number) => {
    setActivePath(pathId);
    setActiveModule(null);
    setLessons([]);
    setModules([]);
    setLoading(true);

    getModulesByPath(pathId)
      .then((response) => {
        if (response.data.success) {
          setModules(response.data.data);
        }
      })
      .catch(() => setError('Gagal memuat modul untuk jalur ini.'))
      .finally(() => setLoading(false));
  };

  const openModule = (moduleId: number) => {
    setActiveModule(moduleId);
    setLoading(true);
    setLessons([]);

    getLessonsByModule(moduleId)
      .then((response) => {
        if (response.data.success) {
          setLessons(response.data.data);
        }
      })
      .catch(() => setError('Gagal memuat pelajaran untuk modul ini.'))
      .finally(() => setLoading(false));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">SignPath</p>
            <h2 className="mt-3 text-3xl font-bold text-white">Pelajari jalur bahasa isyarat secara bertahap.</h2>
          </div>
          <p className="max-w-xl text-slate-400">Pilih jalur, buka modul, lalu lanjutkan pelajaran interaktif dengan simulasi gesture.</p>
        </div>
      </div>

      {error && <p className="rounded-3xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-sm text-red-200">{error}</p>}

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.1fr_1fr]">
        <section className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">Jalur Pembelajaran</h3>
          <div className="mt-6 space-y-4">
            {loading ? (
              <LoadingSpinner />
            ) : (
              paths.map((path) => (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => openPath(path.id)}
                  className={`w-full rounded-3xl border px-5 py-4 text-left transition ${
                    activePath === path.id
                      ? 'border-indigo-400/80 bg-indigo-500/10 text-white'
                      : 'border-slate-700/60 bg-slate-900/80 text-slate-300 hover:border-indigo-400/40 hover:bg-slate-900/90'
                  }`}
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{path.title}</p>
                  <p className="mt-2 text-base font-semibold text-white">{path.description}</p>
                  <p className="mt-3 text-sm text-slate-500">{path.modules_count} modul tersedia</p>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">Modul</h3>
          <div className="mt-6 space-y-4">
            {activePath === null ? (
              <p className="text-slate-400">Pilih jalur untuk melihat modul.</p>
            ) : loading ? (
              <LoadingSpinner />
            ) : modules.length ? (
              modules.map((module) => (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => openModule(module.id)}
                  className={`w-full rounded-3xl border px-5 py-4 text-left transition ${
                    activeModule === module.id
                      ? 'border-sky-400/80 bg-sky-500/10 text-white'
                      : 'border-slate-700/60 bg-slate-900/80 text-slate-300 hover:border-sky-400/40 hover:bg-slate-900/90'
                  }`}
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{module.title}</p>
                  <p className="mt-2 text-base text-slate-200">{module.description}</p>
                  <p className="mt-3 text-sm text-slate-500">{module.lessons_count} pelajaran</p>
                </button>
              ))
            ) : (
              <p className="text-slate-400">Tidak ada modul di jalur ini.</p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">Pelajaran</h3>
          <div className="mt-6 space-y-4">
            {activeModule === null ? (
              <p className="text-slate-400">Pilih modul untuk melihat pelajaran.</p>
            ) : loading ? (
              <LoadingSpinner />
            ) : lessons.length ? (
              lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  className="block rounded-3xl border border-slate-700/60 bg-slate-900/80 px-5 py-4 transition hover:border-indigo-400/40 hover:bg-slate-900/90"
                >
                  <p className="text-base font-semibold text-white">{lesson.title}</p>
                  <p className="mt-2 text-sm text-slate-400">Pelajaran {lesson.order}</p>
                </Link>
              ))
            ) : (
              <p className="text-slate-400">Belum ada pelajaran di modul ini.</p>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
};
