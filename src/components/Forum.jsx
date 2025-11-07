import { useState } from 'react';
import { MessageCircle, ThumbsUp } from 'lucide-react';

const t = {
  en: {
    forum: 'Forum',
    newPost: 'New post',
    placeholder: 'Share something with your friends…',
    reply: 'Reply',
  },
  ru: {
    forum: 'Форум',
    newPost: 'Новая запись',
    placeholder: 'Поделитесь чем-нибудь с друзьями…',
    reply: 'Ответить',
  },
};

export default function Forum({ lang }) {
  const [posts, setPosts] = useState([
    { id: 1, author: 'Alex', text: 'Добро пожаловать в LandJav! 🎧', likes: 4, replies: 2 },
    { id: 2, author: 'Mira', text: 'Создаём каналы как в Telegram, удобно!', likes: 7, replies: 5 },
  ]);
  const [text, setText] = useState('');
  const tt = t[lang];

  function addPost() {
    const value = text.trim();
    if (!value) return;
    setPosts((p) => [{ id: Date.now(), author: 'You', text: value, likes: 0, replies: 0 }, ...p]);
    setText('');
  }

  return (
    <section className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h3 className="text-sm font-medium text-neutral-200">{tt.forum}</h3>
        <button
          onClick={addPost}
          className="rounded-md border border-white/10 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-3 py-1.5 text-xs text-white hover:from-green-500/30 hover:to-blue-500/30"
        >
          {tt.newPost}
        </button>
      </div>

      <div className="border-b border-white/10 p-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={tt.placeholder}
          className="w-full rounded-md border border-white/10 bg-neutral-900 p-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
        />
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-white/10">
        {posts.map((p) => (
          <article key={p.id} className="p-4">
            <div className="mb-2 text-xs text-neutral-500">{p.author}</div>
            <div className="text-neutral-200">{p.text}</div>
            <div className="mt-3 flex items-center gap-4 text-sm text-neutral-400">
              <button className="inline-flex items-center gap-1 hover:text-green-300">
                <ThumbsUp size={16} />
                <span>{p.likes}</span>
              </button>
              <button className="inline-flex items-center gap-1 hover:text-blue-300">
                <MessageCircle size={16} />
                <span>{tt.reply} • {p.replies}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
