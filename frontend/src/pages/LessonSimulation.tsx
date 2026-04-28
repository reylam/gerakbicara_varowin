import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animated, useSpring } from '@react-spring/web';
import toast from 'react-hot-toast';
import useSound from 'use-sound';
import { getLessonDetail, completeLesson } from '../api/lesson';
import { GestureViewer } from '../components/GestureViewer';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { getApiErrorMessage } from '../utils/apiError';

type LessonDetail = {
  id: number;
  title: string;
  content?: string;
  difficulty?: string;
  level?: number;
  quizzes?: Array<{ id: number }>;
  module?: {
    title?: string;
    path?: { title?: string };
  };
};

export const LessonSimulation: React.FC = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [xpInfo, setXpInfo] = useState<{ xp_awarded: number; level: number; total_xp: number } | null>(null);
  const [error, setError] = useState('');
  const [playXp] = useSound('https://actions.google.com/sounds/v1/cartoon/pop.ogg', { volume: 0.4 });
  const xpBannerAnimation = useSpring({
    opacity: xpInfo ? 1 : 0,
    y: xpInfo ? 0 : 12,
    config: { tension: 210, friction: 20 },
  });

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
    setXpInfo(null);
    setError('');

    try {
      const response = await completeLesson(lesson.id);
      if (response.data.success) {
        const data = response.data.data;
        setXpInfo(data);
        playXp();
        toast.success(`XP +${data.xp_awarded} berhasil ditambahkan`);
        if (data.level > (lesson?.level ?? 0)) {
          toast.success(`Level up! Sekarang level ${data.level}`);
        }
      }
    } catch (error: unknown) {
      setError(getApiErrorMessage(error, 'Gagal menyelesaikan pelajaran.'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-center text-[var(--muted)]">{error}</p>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-8 shadow-xl shadow-slate-950/10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#4a7c8e]">Simulasi Pelajaran</p>
            <h2 className="mt-4 text-3xl font-bold text-[var(--text)]">{lesson?.title}</h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">{lesson?.module?.title} • {lesson?.module?.path?.title}</p>
          </div>

          <div className="rounded-3xl bg-[var(--bg)] p-5 text-[var(--text)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Kesulitan</p>
            <p className="mt-2 text-xl font-semibold text-[var(--text)]">{lesson?.difficulty ?? 'Medium'}</p>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mt-4 rounded-full border border-[color:var(--border)] px-4 py-2 text-sm text-[var(--text)] transition hover:bg-[#d6e8f5]/50"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-8 shadow-xl shadow-slate-950/10">
          <h3 className="text-xl font-semibold text-[var(--text)]">Ringkasan Pelajaran</h3>
          <p className="mt-4 leading-7 text-[var(--muted)]">{lesson?.content ?? 'Deskripsi pelajaran belum tersedia.'}</p>

          <div className="mt-8 space-y-4">
            {lesson?.quizzes?.length ? (
              <div className="rounded-3xl bg-[var(--bg)] p-5">
                <h4 className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Quiz tersedia</h4>
                <p className="mt-2 text-[var(--text)]">{lesson.quizzes.length} pertanyaan siap dipelajari.</p>
              </div>
            ) : (
              <div className="rounded-3xl bg-[var(--bg)] p-5 text-[var(--muted)]">Belum ada quiz untuk pelajaran ini.</div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <GestureViewer />

          <div className="rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-6 shadow-xl shadow-slate-950/10">
            <h3 className="text-lg font-semibold text-[var(--text)]">Aksi</h3>
            <p className="mt-3 text-[var(--muted)]">Selesaikan pelajaran ini untuk menambah XP dan menjaga streak belajar.</p>

            {xpInfo && (
              <animated.div
                style={xpBannerAnimation}
                className="mt-4 rounded-3xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700"
              >
                XP +{xpInfo.xp_awarded} | Total XP: {xpInfo.total_xp} | Level: {xpInfo.level}
              </animated.div>
            )}
            {error && <div className="mt-4 rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-700">{error}</div>}

            <button
              type="button"
              disabled={saving}
              onClick={handleComplete}
              className="mt-6 w-full rounded-3xl bg-[#1e71b7] px-5 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:brightness-110 disabled:opacity-60"
            >
              {saving ? 'Memproses...' : 'Selesaikan Pelajaran'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
