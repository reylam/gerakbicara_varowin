import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPaths, getModulesByPath, getLessonsByModule } from '../api/signPath';
import { LoadingSpinner } from '../components/LoadingSpinner';

type PathItem = {
  id: number;
  title: string;
  description: string;
  modules?: Array<unknown>;
};

type ModuleItem = {
  id: number;
  title: string;
  description: string;
  lessons_count: number;
};

type LessonItem = {
  id: number;
  title: string;
  order: number;
};

export const SignPath: React.FC = () => {
  const [paths, setPaths] = useState<PathItem[]>([]);
  const [modules, setModules] = useState<ModuleItem[]>([]);
  const [lessons, setLessons] = useState<LessonItem[]>([]);
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
      <div className="gb-card p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#4a7c8e]">SignPath</p>
            <h2 className="mt-3 text-4xl font-bold text-[var(--text)]">Frasa Sehari-hari</h2>
            <p className="mt-2 text-[var(--muted)]">Pelajari cara merangkai kata dasar menjadi sapaan dan kalimat umum yang sering digunakan.</p>
            <div className="mt-4 h-2.5 w-full max-w-md rounded-full bg-[#d6e8f5]">
              <div className="h-full w-[40%] rounded-full bg-[#1e71b7]" />
            </div>
          </div>
          <button type="button" className="rounded-2xl bg-[#1e71b7] px-6 py-3 font-semibold text-white shadow-sm shadow-slate-900/10">
            Lanjut Belajar
          </button>
        </div>
      </div>

      {error && <p className="rounded-3xl border border-red-500/20 bg-red-500/10 px-6 py-4 text-sm text-red-700">{error}</p>}

      <div className="grid gap-6 xl:grid-cols-[0.6fr_1.4fr]">
        <section className="gb-card p-6">
          <h3 className="text-lg font-semibold text-[var(--text)]">Jalur Pembelajaran</h3>
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
                      ? 'border-[#1e71b7] bg-[#d6e8f5] text-[var(--text)]'
                      : 'border-[color:var(--border)] bg-[var(--bg)] text-[var(--muted)] hover:border-[#1e71b7]/40 hover:bg-[#d6e8f5]/50'
                  }`}
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">{path.title}</p>
                  <p className="mt-2 text-base font-semibold text-[var(--text)]">{path.description}</p>
                  <p className="mt-3 text-sm text-[var(--muted)]">{path.modules?.length ?? 0} modul tersedia</p>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="gb-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--text)]">Level & Modul</h3>
              <span className="rounded-full bg-[#d6e8f5] px-3 py-1 text-xs font-semibold text-[#1e71b7]">Dalam Progress</span>
            </div>
            <div className="space-y-4">
            {activePath === null ? (
              <p className="text-[var(--muted)]">Pilih jalur untuk melihat modul.</p>
            ) : loading ? (
              <LoadingSpinner />
            ) : modules.length ? (
              modules.map((module) => (
                <div key={module.id} className="rounded-2xl border border-[color:var(--border)] bg-[var(--surface)] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-[#1e71b7] px-3 py-1 text-xs font-semibold text-white">LEVEL</span>
                    <span className="text-xs text-[#4a7c8e]">{module.lessons_count} pelajaran</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openModule(module.id)}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                      activeModule === module.id
                        ? 'border-[#4a7c8e] bg-[#d6e8f5] text-[var(--text)]'
                        : 'border-[color:var(--border)] bg-[var(--bg)] text-[var(--muted)] hover:border-[#4a7c8e]/40 hover:bg-[#d6e8f5]/50'
                    }`}
                  >
                    <p className="text-base font-semibold text-[var(--text)]">{module.title}</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">{module.description}</p>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-[var(--muted)]">Tidak ada modul di jalur ini.</p>
            )}
          </div>
          </div>
          <div className="gb-card p-6">
          <h3 className="text-lg font-semibold text-[var(--text)]">Pelajaran</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {activeModule === null ? (
              <p className="text-[var(--muted)] md:col-span-2 xl:col-span-4">Pilih modul untuk melihat pelajaran.</p>
            ) : loading ? (
              <LoadingSpinner />
            ) : lessons.length ? (
              lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  className="block rounded-2xl border border-[#8cd0a4] bg-[#eaf8ef] p-4 transition hover:-translate-y-0.5"
                >
                  <div className="h-16 rounded-xl bg-white/60" />
                  <p className="mt-3 text-base font-semibold text-[var(--text)]">{lesson.title}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">13 gesture • +40 XP</p>
                  <div className="mt-3 h-2 rounded-full bg-white">
                    <div className="h-full w-[72%] rounded-full bg-[#1e71b7]" />
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-[var(--muted)] md:col-span-2 xl:col-span-4">Belum ada pelajaran di modul ini.</p>
            )}
          </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};
