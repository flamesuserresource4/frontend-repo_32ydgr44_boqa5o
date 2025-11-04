import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const moves = [
  { key: 'U', desc: 'Up (atas) searah jarum jam' },
  { key: "U'", desc: 'Up berlawanan arah jarum jam' },
  { key: 'U2', desc: 'Up dua kali (180°)' },
  { key: 'R', desc: 'Right (kanan) searah jarum jam' },
  { key: "R'", desc: 'Right berlawanan arah jarum jam' },
  { key: 'R2', desc: 'Right dua kali (180°)' },
  { key: 'L', desc: 'Left (kiri) searah jarum jam' },
  { key: "L'", desc: 'Left berlawanan arah jarum jam' },
  { key: 'F', desc: 'Front (depan) searah jarum jam' },
  { key: "F'", desc: 'Front berlawanan arah jarum jam' },
  { key: 'B', desc: 'Back (belakang) searah jarum jam' },
  { key: "B'", desc: 'Back berlawanan arah jarum jam' },
  { key: 'D', desc: 'Down (bawah) searah jarum jam' },
  { key: "D'", desc: 'Down berlawanan arah jarum jam' },
];

export default function NotationGuide() {
  return (
    <section id="notation" className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-sky-100 p-2 text-sky-700"><BookOpen className="h-5 w-5" /></div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Notasi Gerakan Dasar</h2>
        </div>
        <p className="text-gray-600 mb-6">Notasi standar digunakan untuk menuliskan algoritma. Huruf menunjukkan sisi kubus, tanda <span className="font-mono">'</span> berarti berlawanan arah jarum jam, dan angka <span className="font-mono">2</span> berarti diputar dua kali (180°).</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {moves.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-2xl font-bold text-gray-900">{m.key}</span>
                <span className="text-sm text-gray-500">{m.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
