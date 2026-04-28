import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getDashboardStats } from '../api/dashboard';
import { getQuizzesByLesson, submitQuizAnswer } from '../api/challenge';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface QuizItem {
  id: number;
  question: string;
  quiz_answers: Array<{ id: number; answer: string }>;
}

export const Challenge: React.FC = () => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [lessonLabel, setLessonLabel] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [resultMessage, setResultMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboardStats()
      .then((dashboardResponse) => {
        if (dashboardResponse.data.success) {
          const recentLessons = dashboardResponse.data.data.recent_completed_lessons;
          if (recentLessons?.length) {
            const latest = recentLessons[0].lesson;
            setLessonLabel(latest.title);
            return getQuizzesByLesson(latest.id);
          }
        }
        return Promise.resolve({ data: { success: false } } as any);
      })
      .then((quizzesResponse) => {
        if (quizzesResponse.data?.success) {
          setQuizzes(quizzesResponse.data.data);
        }
      })
      .catch(() => setError('Gagal memuat tantangan atau kuis.'))
      .finally(() => setLoading(false));
  }, []);

  const handleAnswer = (quizId: number, answerId: number) => {
    setSelectedAnswers((state) => ({ ...state, [quizId]: answerId }));
    setResultMessage('');
  };

  const handleSubmit = async (quizId: number) => {
    const selectedAnswerId = selectedAnswers[quizId];
    if (!selectedAnswerId) {
      setResultMessage('Pilih jawaban sebelum mengirim.');
      return;
    }

    setSubmitLoading(true);
    setError('');

    try {
      const response = await submitQuizAnswer(quizId, selectedAnswerId);
      if (response.data.success) {
        setResultMessage(response.data.data.is_correct ? 'Jawaban benar! XP ditambahkan.' : 'Jawaban salah. Coba lagi selanjutnya.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Gagal mengirim jawaban.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-8 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">Tantangan</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Kerjakan kuis interaktif</h2>
          <p className="mt-3 text-slate-400">Pilih jawaban yang benar untuk meningkatkan kemampuan dan memperoleh XP.</p>

          {error && <div className="mt-6 rounded-3xl bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}

          <div className="mt-8 space-y-6">
            {quizzes.length ? (
              quizzes.map((quiz) => (
                <div key={quiz.id} className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-5">
                  <p className="text-sm text-sky-400/80">Soal</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{quiz.question}</h3>

                  <div className="mt-5 space-y-3">
                    {quiz.quiz_answers.map((answer) => (
                      <button
                        key={answer.id}
                        type="button"
                        onClick={() => handleAnswer(quiz.id, answer.id)}
                        className={`w-full rounded-3xl border px-4 py-3 text-left transition ${
                          selectedAnswers[quiz.id] === answer.id
                            ? 'border-indigo-400/80 bg-indigo-500/10 text-white'
                            : 'border-slate-700/60 bg-slate-950/80 text-slate-300 hover:border-indigo-400/40 hover:bg-slate-900/90'
                        }`}
                      >
                        {answer.answer}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSubmit(quiz.id)}
                    disabled={submitLoading}
                    className="mt-5 inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110 disabled:opacity-60"
                  >
                    {submitLoading ? 'Mengirim...' : 'Kirim Jawaban'}
                  </button>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-8 text-slate-400">
                Tidak ada kuis tersedia dari pelajaran terakhir Anda. Selesaikan pelajaran di SignPath untuk membuka kuis.
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Pelajaran Referensi</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{lessonLabel || 'Belum ada pelajaran'}</h3>
            <p className="mt-3 text-slate-400">Gunakan halaman SignPath untuk memilih pelajaran dan memunculkan kuis yang sesuai.</p>
          </div>

          <div className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-6 text-slate-300">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Lockscreen</p>
            <p className="mt-3 leading-7">
              Kuis akan muncul setelah Anda menyelesaikan pelajaran. Serap materi, lalu uji ingatan dengan tantangan.
            </p>
          </div>

          {resultMessage && <div className="rounded-3xl bg-slate-800/70 p-4 text-sm text-slate-200">{resultMessage}</div>}
        </aside>
      </div>
    </motion.div>
  );
};
