import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getDashboardStats } from '../api/dashboard';
import { getQuizzesByLesson, submitQuizAnswer } from '../api/challenge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { getApiErrorMessage } from '../utils/apiError';

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
    const loadChallenges = async () => {
      try {
        const dashboardResponse = await getDashboardStats();
        if (!dashboardResponse.data.success) return;

        const recentLessons = dashboardResponse.data.data.recent_completed_lessons;
        if (!recentLessons?.length) return;

        const latest = recentLessons[0].lesson;
        setLessonLabel(latest.title);

        const quizzesResponse = await getQuizzesByLesson(latest.id);
        if (quizzesResponse.data.success) {
          setQuizzes(quizzesResponse.data.data);
        }
      } catch {
        setError('Gagal memuat tantangan atau kuis.');
      } finally {
        setLoading(false);
      }
    };

    void loadChallenges();
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
        if (response.data.data.is_correct) {
          toast.success(`Jawaban benar! XP +${response.data.data.xp_awarded}`);
          setResultMessage('Jawaban benar! XP ditambahkan.');
        } else {
          setResultMessage('Jawaban salah. Coba lagi selanjutnya.');
        }
      }
    } catch (error: unknown) {
      setError(getApiErrorMessage(error, 'Gagal mengirim jawaban.'));
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
        <div className="rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-8 shadow-xl shadow-slate-950/10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#4a7c8e]">Tantangan</p>
          <h2 className="mt-3 text-3xl font-bold text-[var(--text)]">Kerjakan kuis interaktif</h2>
          <p className="mt-3 text-[var(--muted)]">Pilih jawaban yang benar untuk meningkatkan kemampuan dan memperoleh XP.</p>

          {error && <div className="mt-6 rounded-3xl bg-red-500/10 p-4 text-sm text-red-700">{error}</div>}

          <div className="mt-8 space-y-6">
            {quizzes.length ? (
              quizzes.map((quiz) => (
                <div key={quiz.id} className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg)] p-5">
                  <p className="text-sm text-[#4a7c8e]">Soal</p>
                  <h3 className="mt-3 text-xl font-semibold text-[var(--text)]">{quiz.question}</h3>

                  <div className="mt-5 space-y-3">
                    {quiz.quiz_answers.map((answer) => (
                      <button
                        key={answer.id}
                        type="button"
                        onClick={() => handleAnswer(quiz.id, answer.id)}
                        className={`w-full rounded-3xl border px-4 py-3 text-left transition ${
                          selectedAnswers[quiz.id] === answer.id
                            ? 'border-[#1e71b7] bg-[#d6e8f5] text-[var(--text)]'
                            : 'border-[color:var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[#1e71b7]/40 hover:bg-[#d6e8f5]/50'
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
                    className="mt-5 inline-flex items-center justify-center rounded-3xl bg-[#1e71b7] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:brightness-110 disabled:opacity-60"
                  >
                    {submitLoading ? 'Mengirim...' : 'Kirim Jawaban'}
                  </button>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-8 text-[var(--muted)]">
                Tidak ada kuis tersedia dari pelajaran terakhir Anda. Selesaikan pelajaran di SignPath untuk membuka kuis.
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-6 shadow-xl shadow-slate-950/10">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Pelajaran Referensi</p>
            <h3 className="mt-3 text-2xl font-semibold text-[var(--text)]">{lessonLabel || 'Belum ada pelajaran'}</h3>
            <p className="mt-3 text-[var(--muted)]">Gunakan halaman SignPath untuk memilih pelajaran dan memunculkan kuis yang sesuai.</p>
          </div>

          <div className="rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-6 text-[var(--text)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Lockscreen</p>
            <p className="mt-3 leading-7">
              Kuis akan muncul setelah Anda menyelesaikan pelajaran. Serap materi, lalu uji ingatan dengan tantangan.
            </p>
          </div>

          {resultMessage && <div className="rounded-3xl bg-[#d6e8f5] p-4 text-sm text-[#475569]">{resultMessage}</div>}
        </aside>
      </div>
    </motion.div>
  );
};
