import Hero from './components/Hero';
import NotationGuide from './components/NotationGuide';
import BeginnerSteps from './components/BeginnerSteps';
import ShortcutAlgorithms from './components/ShortcutAlgorithms';
import FooterTips from './components/FooterTips';

function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-extrabold tracking-tight text-gray-900">Rubik Tutor</a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a className="hover:text-gray-900" href="#notation">Notasi</a>
          <a className="hover:text-gray-900" href="#beginner">Langkah</a>
          <a className="hover:text-gray-900" href="#shortcuts">Shortcut</a>
        </nav>
        <a href="#shortcuts" className="rounded-md bg-sky-600 hover:bg-sky-700 text-white text-sm px-3 py-1.5 font-medium">Mulai</a>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <NotationGuide />
      <BeginnerSteps />
      <ShortcutAlgorithms />
      <FooterTips />
    </div>
  );
}
