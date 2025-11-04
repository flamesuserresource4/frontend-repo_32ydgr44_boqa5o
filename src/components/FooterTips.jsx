import { Rocket, HelpCircle } from 'lucide-react';

export default function FooterTips() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><Rocket className="h-5 w-5" /> Tips Latihan</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Latih notasi dulu hingga otomatis di kepala.</li>
            <li>• Gunakan metronom (40–60 BPM) untuk membangun ritme.</li>
            <li>• Fokus lookahead: lihat keping berikutnya saat menyelesaikan langkah sekarang.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><HelpCircle className="h-5 w-5" /> Istilah Penting</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• OLL: Orientasi Lapis Terakhir.</li>
            <li>• PLL: Permutasi Lapis Terakhir.</li>
            <li>• AUF: Penyesuaian U di akhir (U/U'/U2) untuk menyelaraskan.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Catatan</h3>
          <p className="text-sm text-slate-300">Konten ini untuk pembelajaran cepat. Tingkat lanjut: pelajari F2L intuitif, full OLL (57) dan PLL (21) untuk kecepatan maksimal.</p>
        </div>
      </div>
      <div className="border-t border-slate-800 text-center text-xs text-slate-400 py-4">© {new Date().getFullYear()} Rubik Tutor — Dibuat untuk membantu kamu solve lebih cepat.</div>
    </footer>
  );
}
