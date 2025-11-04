import { motion } from 'framer-motion';
import { Cube, Zap } from 'lucide-react';
import CubeShowcase from './CubeShowcase';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-white" />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 text-sky-700 px-3 py-1 text-sm font-medium">
              <Zap className="h-4 w-4" />
              Belajar cepat dengan animasi interaktif
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Tutorial Rubik 3x3: Rumus Dasar & Shortcut
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Kuasai notasi, langkah pemula, dan kumpulan algoritma cepat (shortcut) untuk menyelesaikan Rubik dengan mudah.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#beginner" className="inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 font-semibold shadow">
                <Cube className="h-5 w-5" />
                Mulai Belajar
              </a>
              <a href="#shortcuts" className="inline-flex items-center gap-2 rounded-lg bg-white hover:bg-gray-50 text-gray-900 px-5 py-3 font-semibold border border-gray-200 shadow">
                Lihat Shortcut
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-[340px] md:h-[420px]"
          >
            <CubeShowcase />
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
