import { useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Forum from './components/Forum';

const appText = {
  en: {
    description: 'Black-themed, fast, and responsive community space with voice chat.',
  },
  ru: {
    description: 'Черная тема, быстрый и отзывчивый форум с голосовым чатом.',
  },
};

export default function App() {
  const [lang, setLang] = useState('ru');
  const [animate, setAnimate] = useState(true);

  const description = useMemo(() => appText[lang].description, [lang]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-green-400/30">
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -inset-20 blur-3xl opacity-20 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-500 via-blue-500 to-transparent" />
      </div>

      <Header lang={lang} setLang={setLang} animate={animate} setAnimate={setAnimate} />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <p className="mb-4 text-sm text-neutral-400">{description}</p>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[70vh]">
          <div className="lg:col-span-1 rounded-xl border border-white/10 bg-neutral-900/40">
            <Sidebar lang={lang} />
          </div>
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-neutral-900/40 overflow-hidden">
            <Chat lang={lang} animate={animate} />
          </div>
          <div className="lg:col-span-1 rounded-xl border border-white/10 bg-neutral-900/40 overflow-hidden">
            <Forum lang={lang} />
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-8 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} LandJav
      </footer>
    </div>
  );
}
