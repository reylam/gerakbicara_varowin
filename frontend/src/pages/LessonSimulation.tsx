import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getLessonDetail, completeLesson } from '../api/lesson';
import { GestureViewer } from '../components/GestureViewer';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const LessonSimulation: React.FC = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!lessonId) return;
    getLessonDetail(lessonId)
      .then((response) => {
        if (response.data.success) {
          setLesson(response.data.data);
        }
      })
      .catch(() => setError('Tidak dapat memuat detail pelajaran.'))
      .finally(() => setLoading(false));
  }, [lessonId]);

  const handleComplete = async () => {
    if (!lesson?.id) return;
    setSaving(true);
    setToast('');
    setError('');

    try {
      const response = await completeLesson(lesson.id);
      if (response.data.success) {
        setToast('Pelajaran berhasil diselesaikan! XP telah ditambahkan.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Gagal menyelesaikan pelajaran.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-center text-slate-300">{error}</p>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">Simulasi Pelajaran</p>
            <h2 className="mt-4 text-3xl font-bold text-white">{lesson?.title}</h2>
            <p className="mt-3 text-slate-400 max-w-2xl">{lesson?.module?.title} • {lesson?.module?.path?.title}</p>
          </div>

          <div className="rounded-3xl bg-slate-900/90 p-5 text-slate-300">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Kesulitan</p>
            <p className="mt-2 text-xl font-semibold text-white">{lesson?.difficulty ?? 'Medium'}</p>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-4 rounded-full border border-slate-700/70 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/5"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/20">
          <h3 className="text-xl font-semibold text-white">Ringkasan Pelajaran</h3>
          <p className="mt-4 leading-7 text-slate-300">{lesson?.content ?? 'Deskripsi pelajaran belum tersedia.'}</p>

          <div className="mt-8 space-y-4">
            {lesson?.quizzes?.length ? (
              <div className="rounded-3xl bg-slate-900/80 p-5">
                <h4 className="text-sm uppercase tracking-[0.3em] text-slate-400">Quiz tersedia</h4>
                <p className="mt-2 text-slate-300">{lesson.quizzes.length} pertanyaan siap dipelajari.</p>
              </div>
            ) : (
              <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-300">Belum ada quiz untuk pelajaran ini.</div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <GestureViewer />

          <div className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/10">
            <h3 className="text-lg font-semibold text-white">Aksi</h3>
            <p className="mt-3 text-slate-400">Selesaikan pelajaran ini untuk menambah XP dan menjaga streak belajar.</p>

            {toast && <div className="mt-4 rounded-3xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{toast}</div>}
            {error && <div className="mt-4 rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

            <button
              type="button"
              disabled={saving}
              onClick={handleComplete}
              className="mt-6 w-full rounded-3xl bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110 disabled:opacity-60"
            >
              {saving ? 'Memproses...' : 'Selesaikan Pelajaran'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
