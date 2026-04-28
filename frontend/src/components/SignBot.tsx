import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchSignBotHistory, sendSignBotMessage } from '../api/signBot';
import { LoadingSpinner } from './LoadingSpinner';

interface MessageItem {
  id: number;
  message: string;
  role: 'user' | 'bot';
}

export const SignBot: React.FC = () => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSignBotHistory()
      .then((response) => {
        if (response.data.success) {
          setMessages(response.data.data.reverse());
        }
      })
      .catch(() => setError('Gagal memuat riwayat chat.'))
      .finally(() => setLoading(false));
  }, []);

  const handleSend = async () => {
    if (!draft.trim()) return;

    setSending(true);
    setError('');

    try {
      const response = await sendSignBotMessage(draft);
      if (response.data.success) {
        setMessages((state) => [
          ...(state ?? []),
          { id: response.data.data.user_message.id, message: draft, role: 'user' },
          { id: response.data.data.bot_message.id, message: response.data.data.bot_message.message, role: 'bot' },
        ]);
        setDraft('');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Gagal mengirim pesan.');
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-6 bottom-6 z-30 w-[360px] max-w-full rounded-[32px] border border-slate-700/60 bg-slate-950/95 p-5 shadow-2xl shadow-slate-950/50 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-400/80">SignBot</p>
          <h2 className="text-lg font-semibold text-white">Pendamping Belajar</h2>
        </div>
        <div className="rounded-2xl bg-indigo-500/10 px-3 py-2 text-xs font-semibold text-indigo-200">Aktif</div>
      </div>

      <div className="mt-5 h-[340px] overflow-y-auto rounded-3xl border border-slate-800/80 bg-slate-900/90 p-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-4">
            {messages.length ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-3xl p-4 text-sm ${
                    message.role === 'user'
                      ? 'bg-slate-800 text-slate-100 self-end'
                      : 'bg-slate-950/90 text-slate-300'
                  }`}
                >
                  <p>{message.message}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">Tanyakan sesuatu tentang pelajaran, kuis, atau gesture 3D.</p>
            )}
          </div>
        )}
      </div>

      {error && <p className="mt-4 rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Tanya SignBot..."
          className="w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400/80"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={sending}
          className="inline-flex h-12 items-center justify-center rounded-3xl bg-indigo-500 px-5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-60"
        >
          Kirim
        </button>
      </div>
    </motion.aside>
  );
};
