import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const steps = [
  {
    title: '1) Daisy ➜ Cross Putih',
    algs: ['F/B/U/D/R/L seperlunya'],
    tip: 'Buat bunga (daisy) di atas, lalu bawa tepinya ke tengah putih untuk membentuk cross putih yang sejajar dengan warna tengah.',
  },
  {
    title: '2) Sudut Layer Pertama',
    algs: ["R U R'", "R U' R'"],
    tip: 'Tempatkan sudut putih satu per satu. Gunakan putaran kecil agar cross tetap rapi.',
  },
  {
    title: '3) Tepi Layer Kedua',
    algs: ["U R U' R' U' F' U F", "U' L' U L U F U' F'"],
    tip: 'Pindahkan tepi tanpa warna kuning ke layer kedua. Sesuaikan arah kiri/kanan.',
  },
  {
    title: '4) Orientasi Layer Atas (OLL)',
    algs: ['Sune: R U R\' U R U2 R\'', "Anti-Sune: L' U' L U' L' U2 L"],
    tip: 'Buat seluruh sisi atas menjadi kuning. Mulai dari garis/kait lalu penuh.',
  },
  {
    title: '5) Permutasi Layer Atas (PLL)',
    algs: ['U-Perm (a): R U R\' U R U2 R\'', 'T-Perm: R U R\' U\' R\' F R2 U\' R\' U\' R U R\' F\''],
    tip: 'Susun posisi tepi dan sudut terakhir hingga seluruh kubus selesai.',
  },
];

export default function BeginnerMethod() {
  return (
    <section id="beginner" className="py-12 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5 text-sky-600" />
          <h2 className="text-2xl md:text-3xl font-bold">Metode Pemula (Layer-by-Layer)</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Ikuti langkah berurutan ini dari dasar hingga mahir. Setiap kartu menampilkan rumus yang bisa kamu latih berulang.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{s.title}</h3>
              <div className="space-y-1">
                {s.algs.map((a) => (
                  <code
                    key={a}
                    className="inline-block rounded bg-gray-100 px-2 py-1 text-sm text-gray-800"
                  >
                    {a}
                  </code>
                ))}
              </div>
              <p className="mt-3 text-sm text-gray-600">{s.tip}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
