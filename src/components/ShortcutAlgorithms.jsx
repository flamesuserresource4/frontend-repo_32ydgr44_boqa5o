import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Flash } from 'lucide-react';

const algorithms = [
  {
    name: 'Sune (OLL)',
    moves: ["R", "U", "R'", "U", "R", "U2", "R'"],
    note: 'Orientasi sudut cepat, sangat umum untuk 2-Look OLL.'
  },
  {
    name: 'Anti-Sune (OLL)',
    moves: ["R'", "U'", "R", "U'", "R'", "U2", "R"],
    note: 'Kebalikan dari Sune.'
  },
  {
    name: 'T-Perm (PLL)',
    moves: ["R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'", "R", "U", "R'", "F'"],
    note: 'Menukar 2 tepi dan 2 sudut, sangat populer.'
  },
  {
    name: 'J-Perm (PLL) – Jb',
    moves: ["R", "U", "R'", "F'", "R", "U", "R'", "U'", "R'", "F", "R2", "U'", "R'", "U'"],
    note: 'Menempatkan sudut dengan cepat, alternatif T-Perm.'
  },
];

function useHighlighter(seq, speed = 500) {
  const [index, setIndex] = useState(-1);
  const timer = useRef(null);

  const play = () => {
    clearInterval(timer.current);
    setIndex(0);
    timer.current = setInterval(() => {
      setIndex((i) => {
        if (i >= seq.length - 1) {
          clearInterval(timer.current);
          return -1;
        }
        return i + 1;
      });
    }, speed);
  };

  const stop = () => {
    clearInterval(timer.current);
    setIndex(-1);
  };

  useEffect(() => () => clearInterval(timer.current), []);

  return { index, play, stop };
}

export default function ShortcutAlgorithms() {
  return (
    <section id="shortcuts" className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-fuchsia-100 p-2 text-fuchsia-700"><Flash className="h-5 w-5" /></div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Rumus Shortcut Populer (2-Look OLL/PLL)</h2>
        </div>
        <p className="text-gray-600 mb-6">Klik "Play" untuk menyorot urutan gerakan langkah demi langkah. Latih perlahan hingga jari terasa nyaman.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {algorithms.map((alg, idx) => (
            <AlgCard key={alg.name} alg={alg} delay={idx * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AlgCard({ alg, delay }) {
  const { index, play, stop } = useHighlighter(alg.moves, 500);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{alg.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{alg.note}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={play} className="rounded-md bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-sm px-3 py-1.5 font-medium">Play</button>
          <button onClick={stop} className="rounded-md bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm px-3 py-1.5 font-medium">Stop</button>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {alg.moves.map((m, i) => (
          <span
            key={`${alg.name}-${m}-${i}`}
            className={`font-mono text-sm px-2.5 py-1 rounded-md border ${i === index ? 'bg-fuchsia-600 text-white border-fuchsia-600' : 'bg-gray-50 text-gray-800 border-gray-200'}`}
          >
            {m}
          </span>
        ))}
      </div>
      <div className="mt-4 h-1 w-full bg-gray-100 rounded overflow-hidden">
        <div
          className="h-full bg-fuchsia-500 transition-all duration-300"
          style={{ width: index >= 0 ? `${((index + 1) / alg.moves.length) * 100}%` : '0%' }}
        />
      </div>
    </motion.div>
  );
}
