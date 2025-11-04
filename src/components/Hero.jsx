import { motion } from 'framer-motion';
import { Cube, Zap } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Spline full-bleed cover background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/O-AdlP9lTPNz-i8a/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Top-to-bottom gradient overlay to ensure text contrast; doesn't block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10" />

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 text-white backdrop-blur px-3 py-1 text-sm font-medium ring-1 ring-white/20">
              <Zap className="h-4 w-4" />
              Interaktif • Dark • Fintech Travel Vibes
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
              Tutorial Rubik 3x3: Rumus Dasar & Shortcut
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-prose">
              Kuasai notasi, langkah pemula, dan kumpulan algoritma cepat (shortcut) untuk menyelesaikan Rubik dengan mudah.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#beginner" className="inline-flex items-center gap-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100 px-5 py-3 font-semibold shadow ring-1 ring-white/20">
                <Cube className="h-5 w-5" />
                Mulai Belajar
              </a>
              <a href="#shortcuts" className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 text-white px-5 py-3 font-semibold ring-1 ring-white/25">
                Lihat Shortcut
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-[360px] md:h-[440px]"
          >
            {/* Empty on purpose – Spline covers the background. This column balances layout. */}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade so content below sits cleanly over the dark hero; doesn't block interactions */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
