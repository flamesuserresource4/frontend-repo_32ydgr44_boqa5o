import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Flash, Play, Pause } from 'lucide-react';
import MiniMoveCube from './MiniMoveCube';

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
    name: 'H-Perm (PLL)',
    moves: ["M2", "U", "M2", "U2", "M2", "U", "M2"],
    note: 'Menukar dua pasang tepi berseberangan.'
  },
  {
    name: 'Z-Perm (PLL)',
    moves: ["M2", "U", "M2", "U", "M'", "U2", "M2", "U2", "M'", "U2"],
    note: 'Menukar dua pasang tepi bersebelahan.'
  },
  {
    name: 'U-Perm (PLL) – Ua',
    moves: ["R", "U", "R", "U", "R", "U", "R", "U'", "R'", "U'", "R2"],
    note: 'Satu siklus tepi searah jarum jam.'
  },
  {
    name: 'U-Perm (PLL) – Ub',
    moves: ["R2", "U", "R", "U", "R'", "U'", "R'", "U'", "R'", "U", "R'"],
    note: 'Satu siklus tepi berlawanan jarum jam.'
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
  {
    name: 'A-Perm (PLL) – Aa',
    moves: ["x", "R'", "U", "R'", "D2", "R", "U'", "R'", "D2", "R2", "x'"],
    note: 'Memutar tiga sudut (varian Aa).'
  },
  {
    name: 'A-Perm (PLL) – Ab',
    moves: ["x'", "R", "U'", "R", "D2", "R'", "U", "R", "D2", "R2", "x"],
    note: 'Memutar tiga sudut (varian Ab).'
  },
];

function useClickSynth() {
  const ctxRef = useRef(null);
  const ensure = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  };
  const click = (freq = 1100, duration = 0.04) => {
    const ctx = ensure();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.005);
  };
  return { click };
}

function useHighlighter(seq, speed = 480) {
  const [index, setIndex] = useState(-1);
  const timer = useRef(null);
  const isPlaying = index !== -1;
  const { click } = useClickSynth();

  const play = () => {
    clearInterval(timer.current);
    setIndex(0);
    click(900);
    timer.current = setInterval(() => {
      setIndex((i) => {
        const next = i + 1;
        if (next >= seq.length) {
          clearInterval(timer.current);
          return -1;
        }
        click(1100);
        return next;
      });
    }, speed);
  };

  const stop = () => {
    clearInterval(timer.current);
    setIndex(-1);
  };

  useEffect(() => () => clearInterval(timer.current), []);

  return { index, play, stop, isPlaying };
}

export default function ShortcutAlgorithms() {
  return (
    <section id="shortcuts" className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-fuchsia-100 p-2 text-fuchsia-700"><Flash className="h-5 w-5" /></div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Rumus Shortcut Populer (2-Look OLL/PLL)</h2>
        </div>
        <p className="text-gray-600 mb-6">Klik "Play" untuk menyorot urutan gerakan langkah demi langkah (dengan suara klik pendek). Kini juga ada mini cube yang memvisualisasikan U, R, F, dll saat sequence berjalan.</p>
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
  const { index, play, stop, isPlaying } = useHighlighter(alg.moves, 460);

  const currentMove = index >= 0 ? alg.moves[index] : null;

  // Normalize display for wide-turns and rotations visually
  const prettyMoves = useMemo(() => alg.moves.map(m => m.replace('x', 'x').replace('M', 'M')), [alg.moves]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{alg.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{alg.note}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          {!isPlaying ? (
            <button onClick={play} className="inline-flex items-center gap-1.5 rounded-md bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-sm px-3 py-1.5 font-medium">
              <Play className="h-4 w-4" /> Play
            </button>
          ) : (
            <button onClick={stop} className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm px-3 py-1.5 font-medium">
              <Pause className="h-4 w-4" /> Stop
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {prettyMoves.map((m, i) => (
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

      <div className="mt-5 rounded-lg border border-gray-200 p-3 bg-gray-50">
        <div className="text-xs text-gray-500 mb-2">Visualisasi: {currentMove || '—'}</div>
        <MiniMoveCube move={currentMove} />
      </div>
    </motion.div>
  );
}
