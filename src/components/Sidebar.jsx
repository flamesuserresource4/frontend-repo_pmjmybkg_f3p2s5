import { useState } from 'react';
import { Hash, Plus, Search } from 'lucide-react';

const t = {
  en: {
    channels: 'Channels',
    search: 'Search',
    newGroup: 'New Group',
  },
  ru: {
    channels: 'Каналы',
    search: 'Поиск',
    newGroup: 'Новая группа',
  },
};

export default function Sidebar({ lang, onCreateChannel }) {
  const [query, setQuery] = useState('');
  const [channels, setChannels] = useState([
    { id: 1, name: 'general' },
    { id: 2, name: 'voice-chat' },
    { id: 3, name: 'random' },
  ]);

  const tt = t[lang];

  const filtered = channels.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  function handleCreate() {
    const name = prompt('Channel name');
    if (!name) return;
    const ch = { id: Date.now(), name };
    setChannels((prev) => [...prev, ch]);
    onCreateChannel?.(ch);
  }

  return (
    <aside className="h-full w-full overflow-hidden border-r border-white/10">
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-medium text-neutral-200">{tt.channels}</h3>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-2 py-1 text-xs text-white hover:from-green-500/30 hover:to-blue-500/30"
        >
          <Plus size={14} />
          <span>{tt.newGroup}</span>
        </button>
      </div>
      <div className="px-3 pb-3">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tt.search}
            className="w-full rounded-md border border-white/10 bg-neutral-900 pl-8 pr-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-400/40"
          />
        </div>
      </div>
      <div className="h-[1px] w-full bg-white/10" />
      <div className="overflow-y-auto p-2 space-y-1">
        {filtered.map((c) => (
          <button key={c.id} className="group flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-neutral-300 hover:bg-white/5">
            <Hash size={16} className="text-neutral-500 group-hover:text-green-400" />
            <span className="truncate">{c.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
