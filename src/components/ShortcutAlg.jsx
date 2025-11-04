import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bolt, Copy, Check } from 'lucide-react';

const algorithms = [
  { name: 'Sexy Move', alg: "R U R' U'", note: 'Pembangun dasar untuk banyak pola.' },
  { name: 'Sledgehammer', alg: "R' F R F'", note: 'Bagus untuk setup F2L dan sudut.' },
  { name: 'Sune', alg: "R U R' U R U2 R'", note: 'OLL populer untuk membuat kuning.' },
  { name: 'Anti-Sune', alg: "L' U' L U' L' U2 L", note: 'Kebalikan Sune.' },
  { name: 'T-Perm', alg: "R U R' U' R' F R2 U' R' U' R U R' F'", note: 'PLL cepat untuk menukar dua sudut dan dua tepi.' },
  { name: 'Ua-Perm', alg: "R U R' U R U2 R'", note: 'Menukar tiga tepi (searah).' },
  { name: 'H-Perm', alg: "M2 U M2 U2 M2 U M2", note: 'Menukar dua pasang tepi.' },
];

export default function ShortcutAlg() {
  return (
    <section id="shortcuts" className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-2 mb-6">
          <Bolt className="h-5 w-5 text-sky-600" />
          <h2 className="text-2xl md:text-3xl font-bold">Rumus Shortcut Populer</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Kumpulan algoritma cepat untuk OLL/PLL dan utility. Ketuk untuk menyalin dan latihan berulang.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {algorithms.map((alg, i) => (
            <AlgCard key={alg.name} alg={alg} idx={i} />)
          )}
        </div>
      </div>
    </section>
  );
}

function AlgCard({ alg, idx }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    await navigator.clipboard.writeText(alg.alg);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: idx * 0.05 }}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{alg.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{alg.note}</p>
        </div>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {copied ? <Check className="h-4 w-4 text-green-600"/> : <Copy className="h-4 w-4" />}  
          {copied ? 'Tersalin' : 'Salin'}
        </button>
      </div>
      <code className="mt-3 block rounded bg-gray-100 px-3 py-2 text-gray-900 font-mono text-sm">{alg.alg}</code>
    </motion.div>
  );
}
