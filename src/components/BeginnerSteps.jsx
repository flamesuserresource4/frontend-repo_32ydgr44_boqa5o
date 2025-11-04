import { motion } from 'framer-motion';
import { Steps } from 'lucide-react';

const steps = [
  {
    title: 'Cross Putih',
    detail:
      'Buat tanda plus (cross) pada sisi putih dengan tepi yang selaras dengan warna pusat sisi lain.',
    tips: 'Fokus pada kecocokan warna tepi dengan pusat, bukan hanya membentuk plus.',
  },
  {
    title: 'Sudut Lapis Pertama',
    detail:
      'Tempatkan 4 sudut (corner) putih pada posisi yang benar untuk menyelesaikan lapis pertama.',
    tips: 'Gunakan rumus dasar: R U R\' untuk memasukkan sudut ke kanan depan.',
  },
  {
    title: 'Tepi Lapis Kedua',
    detail:
      'Masukkan 4 tepi (edge) ke lapis kedua tanpa merusak lapis pertama.',
    tips: 'Gunakan U untuk menyelaraskan, lalu algoritma kiri/kanan: U R U\' R\' U\' F\' U F atau U\' L\' U L U F U\' F\'.',
  },
  {
    title: 'Orientasi Lapis Terakhir (OLL 2-LOOK)',
    detail:
      'Buat sisi atas menjadi warna sama (misal kuning) tanpa memedulikan posisi.',
    tips: 'Pola umum: Sune (R U R\' U R U2 R\') dan Anti-Sune (R\' U\' R U\' R\' U2 R).',
  },
  {
    title: 'Permutasi Lapis Terakhir (PLL 2-LOOK)',
    detail:
      'Posisikan tepi dan sudut pada lapis terakhir hingga kubus selesai.',
    tips: 'Gunakan algoritma seperti T-Perm atau J-Perm untuk menukar beberapa keping.',
  },
];

export default function BeginnerSteps() {
  return (
    <section id="beginner" className="py-16 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700"><Steps className="h-5 w-5" /></div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Langkah Pemula (Layer by Layer)</h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s, idx) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow">
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{s.title}</h3>
              <p className="text-gray-600 mb-2">{s.detail}</p>
              <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2"><span className="font-semibold">Tips:</span> {s.tips}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
