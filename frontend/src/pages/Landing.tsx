import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
import { Sparkles, Layers, MessageCircle, TrendingUp } from 'lucide-react';
import { FaGamepad, FaHandsHelping } from 'react-icons/fa';
import { ROUTES } from '../utils/routes';
import gerakBicaraLogo from '../assets/gerakbicara.png';
import { lottiePulse } from '../utils/lottiePulse';

const features = [
  {
    title: 'Interactive Learning',
    description: 'Ikuti jalur kursus yang jelas dan praktikkan gesture secara langsung dengan umpan balik visual.',
    icon: Sparkles,
  },
  {
    title: '3D Gesture Visualization',
    description: 'Putar dan zoom gesture 3D untuk memahami gerakan tangan dengan lebih dalam.',
    icon: Layers,
  },
  {
    title: 'Gamifikasi & XP',
    description: 'Kumpulkan XP, naik level, dan pertahankan streak setiap hari untuk kemajuan nyata.',
    icon: TrendingUp,
  },
  {
    title: 'SignBot Pendamping',
    description: 'Tanya materi secara langsung dan dapatkan bantuan langkah demi langkah dari chatbot pintar.',
    icon: MessageCircle,
  },
];

const steps = [
  { title: 'Pilih materi', description: 'Temukan jalur belajar yang sesuai dengan tujuan dan level Anda.' },
  { title: 'Pelajari gesture', description: 'Gunakan simulasi 3D untuk melihat gerakan tangan secara mendetail.' },
  { title: 'Praktik & dapat feedback', description: 'Kerjakan kuis interaktif dan signbot memberi saran peningkatan.' },
  { title: 'Naik level', description: 'Kumpulkan XP dan capai level baru di setiap langkah.' },
];

const benefits = [
  {
    title: 'Untuk masyarakat umum',
    description: 'Membangun pemahaman bahasa isyarat dengan cara belajar yang mudah dan visual.',
  },
  {
    title: 'Untuk komunitas Tuli',
    description: 'Mendukung literasi inklusif dengan konten yang dirancang untuk aksesibilitas.',
  },
];

export const Landing: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div className="space-y-24">
      <section className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[var(--surface)]/70 px-4 py-2 text-sm text-[var(--text)]"
          >
            <span className="h-2 w-2 rounded-full bg-[#1e71b7] animate-pulse" />
            Belajar bahasa isyarat jadi lebih mudah dan interaktif
          </motion.div>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[var(--surface)] px-4 py-2">
            <img src={gerakBicaraLogo} alt="Gerak Bicara logo" className="h-8 w-auto object-contain" />
            <span className="text-sm font-semibold text-[#1e71b7]">Gerak Bicara</span>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            <h1 className="text-5xl font-black tracking-tight text-[var(--text)] sm:text-6xl">
              Belajar Bahasa Isyarat Jadi Lebih Mudah & Interaktif
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              Gerak Bicara membantu Anda memahami gesture melalui jalur belajar, visualisasi 3D, kuis gamified, dan chat
              pendamping.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to={ROUTES.register}
              className="inline-flex items-center justify-center rounded-full bg-[#1e71b7] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110"
            >
              Mulai Sekarang Gratis
            </Link>
            <Link
              to={ROUTES.login}
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-[var(--surface)] px-6 py-3 text-base font-semibold text-[var(--text)] transition hover:bg-slate-100/80"
            >
              Lihat Fitur
            </Link>
          </motion.div>
        </div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[var(--surface)] shadow-2xl shadow-slate-950/10"
        >
          <div className="p-8">
            <div className="rounded-3xl border border-[color:var(--border)] bg-[var(--bg)] p-4">
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1e71b7] to-[#4a7c8e] text-white shadow-inner shadow-slate-950/20">
                <div className="space-y-3 text-center">
                  <div className="mx-auto h-14 w-14">
                    <Lottie animationData={lottiePulse} loop autoplay />
                  </div>
                  <p className="text-sm font-semibold">3D Gesture Hub</p>
                  <p className="max-w-xs text-[13px] text-white/75">Visualisasi interaktif untuk setiap pelajaran.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-[#1e71b7] to-[#4a7c8e] p-8 text-white shadow-lg shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-100/80">Tampilan Produk</p>
              <h2 className="mt-4 text-3xl font-bold">Dashboard modern untuk setiap pelajar.</h2>
              <p className="mt-4 leading-7 text-slate-100/80">
                Semua status belajar, XP, streak, dan kemajuan tersaji dalam satu tampilan yang elegan.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-white/10 p-5 text-[var(--text)]">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">XP Hari Ini</p>
                  <p className="mt-4 text-3xl font-bold">+45</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-5 text-[var(--text)]">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Streak</p>
                  <p className="mt-4 text-3xl font-bold">7 Hari</p>
                </div>
              </div>
              <div className="rounded-3xl bg-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">SignPath</p>
                <p className="mt-3 text-lg font-semibold text-[var(--text)]">Mulai dari dasar hingga mahir.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section>
        <div className="mb-10 flex items-center gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#d6e8f5] text-[var(--text)] shadow-sm shadow-slate-950/10">
            <Sparkles className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#4a7c8e]">Fitur Unggulan</p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--text)]">Semua fitur penting untuk belajar sign language</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-8 shadow-sm shadow-slate-950/5"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#d6e8f5] text-[#1e71b7]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[var(--text)]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-[color:var(--border)] bg-[var(--surface)] p-10 shadow-lg shadow-slate-950/5">
          <p className="text-sm uppercase tracking-[0.3em] text-[#4a7c8e]">Cara Kerja</p>
          <h2 className="mt-4 text-3xl font-bold text-[var(--text)]">Langkah sederhana untuk mulai belajar</h2>
          <div className="mt-8 space-y-5">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-[color:var(--border)] p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef6ff] text-[#1e71b7] font-semibold">{index + 1}</span>
                <h3 className="mt-4 text-xl font-semibold text-[var(--text)]">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-[color:var(--border)] bg-[var(--surface)] p-10 shadow-lg shadow-slate-950/5">
          <p className="text-sm uppercase tracking-[0.3em] text-[#4a7c8e]">Keuntungan</p>
          <h2 className="mt-4 text-3xl font-bold text-[var(--text)]">Dirancang untuk semua pengguna</h2>
          <div className="mt-8 grid gap-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-3xl border border-[color:var(--border)] p-6">
                <h3 className="text-lg font-semibold text-[var(--text)]">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{benefit.description}</p>
              </div>
            ))}
            <div className="rounded-3xl border border-[color:var(--border)] p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--text)]">
                <FaGamepad /> Gamifikasi Serasa Game
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">Feedback XP, level up, dan streak bikin belajar terasa seru setiap hari.</p>
            </div>
            <div className="rounded-3xl border border-[color:var(--border)] p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--text)]">
                <FaHandsHelping /> Inklusif Untuk Semua
              </h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">Platform dibuat untuk pelajar umum dan komunitas Tuli dalam satu ekosistem.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-[color:var(--border)] bg-[var(--surface)] p-10 text-center shadow-lg shadow-slate-950/5">
        <p className="text-sm uppercase tracking-[0.3em] text-[#4a7c8e]">Siap mulai?</p>
        <h2 className="mt-4 text-4xl font-bold text-[var(--text)]">Mulai sekarang gratis dan belajar bahasa isyarat dengan percaya diri.</h2>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to={ROUTES.register}
            className="inline-flex items-center justify-center rounded-full bg-[#1e71b7] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:brightness-110"
          >
            Mulai Sekarang Gratis
          </Link>
          <Link
            to={ROUTES.login}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-[var(--bg)] px-8 py-4 text-base font-semibold text-[var(--text)] transition hover:bg-slate-100/80"
          >
            Masuk untuk Melanjutkan
          </Link>
        </div>
      </section>

      <footer className="border-t border-[color:var(--border)] pt-10 text-center text-sm text-[var(--muted)]">
        <p>Gerak Bicara © 2026 — Platform pembelajaran bahasa isyarat modern dan inklusif.</p>
      </footer>
    </div>
  );
};
