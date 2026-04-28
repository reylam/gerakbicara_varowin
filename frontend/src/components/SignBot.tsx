import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useClickAway } from 'react-use';
import { fetchSignBotHistory, sendSignBotMessage } from '../api/signBot';
import { LoadingSpinner } from './LoadingSpinner';
import { getApiErrorMessage } from '../utils/apiError';

interface MessageItem {
  id: number;
  message: string;
  role: 'user' | 'bot';
}

export const SignBot: React.FC = () => {
  const [messagesParent] = useAutoAnimate();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  useClickAway(panelRef, () => {
    if (open) setOpen(false);
  });

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
    } catch (error: unknown) {
      setError(getApiErrorMessage(error, 'Gagal mengirim pesan.'));
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.aside initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} className="fixed bottom-6 right-4 z-30 sm:right-6">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#1e71b7] px-4 py-3 text-sm font-semibold text-white shadow-lg"
        >
          <MessageCircle className="h-4 w-4" />
          SignBot
        </button>
      )}
      {open && (
        <div ref={panelRef} className="w-[340px] max-w-[94vw] rounded-[32px] border border-[color:var(--border)] bg-[var(--surface)] p-5 shadow-2xl shadow-slate-950/15 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#4a7c8e]">SignBot</p>
          <h2 className="text-lg font-semibold text-[var(--text)]">Pendamping Belajar</h2>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-2xl bg-[#d6e8f5] px-3 py-2 text-xs font-semibold text-[#1e71b7]"
        >
          Tutup
        </button>
      </div>

      <div className="mt-5 h-[340px] overflow-y-auto rounded-3xl border border-[color:var(--border)] bg-[var(--bg)] p-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div ref={messagesParent} className="space-y-4">
            {messages.length ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-3xl p-4 text-sm ${
                    message.role === 'user'
                      ? 'bg-[#1e71b7] text-white self-end'
                      : 'bg-[#d6e8f5] text-[#475569]'
                  }`}
                >
                  <p>{message.message}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--muted)]">Tanyakan sesuatu tentang pelajaran, kuis, atau gesture 3D.</p>
            )}
          </div>
        )}
      </div>

      {error && <p className="mt-4 rounded-3xl bg-red-500/10 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Tanya SignBot..."
          className="w-full rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition focus:border-[#1e71b7]"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={sending}
          className="inline-flex h-12 items-center justify-center rounded-3xl bg-[#1e71b7] px-5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
        >
          Kirim
        </button>
      </div>
      </div>
      )}
    </motion.aside>
  );
};
