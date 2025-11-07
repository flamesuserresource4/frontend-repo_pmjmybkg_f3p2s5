import { useState } from 'react';
import { Globe, Zap } from 'lucide-react';

const translations = {
  en: {
    title: 'LandJav',
    tagline: 'Forum and voice chat with your friends',
    language: 'Language',
    animations: 'Animations',
  },
  ru: {
    title: 'LandJav',
    tagline: 'Форум и голосовой чат с друзьями',
    language: 'Язык',
    animations: 'Анимации',
  },
};

export default function Header({ lang, setLang, animate, setAnimate }) {
  const t = translations[lang];

  return (
    <header className="w-full border-b border-white/10 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500" aria-hidden />
          <div>
            <h1 className="text-xl font-semibold text-white tracking-wide">{t.title}</h1>
            <p className="text-xs text-neutral-400">{t.tagline}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-neutral-300">
            <Globe size={16} className="opacity-70" />
            <select
              aria-label={t.language}
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-neutral-900 text-neutral-200 border border-white/10 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-400/50"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>
          <button
            onClick={() => setAnimate((v) => !v)}
            className={`inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-white transition ${
              animate
                ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30'
                : 'bg-neutral-900 hover:bg-neutral-800'
            }`}
            title={t.animations}
          >
            <Zap size={16} className={animate ? 'text-green-400' : 'text-neutral-400'} />
            <span>{t.animations}: {animate ? 'On' : 'Off'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
