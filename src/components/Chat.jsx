import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Phone, Send, Users } from 'lucide-react';

const t = {
  en: {
    placeholder: 'Write a message…',
    send: 'Send',
    voiceOn: 'Mic on',
    voiceOff: 'Mic off',
    participants: 'Participants',
  },
  ru: {
    placeholder: 'Напишите сообщение…',
    send: 'Отправить',
    voiceOn: 'Микрофон включен',
    voiceOff: 'Микрофон выключен',
    participants: 'Участники',
  },
};

export default function Chat({ lang, animate }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [micOn, setMicOn] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [input]);

  const tt = t[lang];

  function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { id: Date.now(), text: trimmed, me: true }]);
    setInput('');
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 text-neutral-300">
          <Users size={16} />
          <span className="text-sm">{tt.participants}: 3</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMicOn((v) => !v)}
            className={`inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-white transition bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 ${
              animate ? 'animate-pulse [animation-duration:2.5s]' : ''
            }`}
          >
            {micOn ? <Mic size={16} className="text-green-400" /> : <MicOff size={16} className="text-neutral-400" />}
            <span>{micOn ? tt.voiceOn : tt.voiceOff}</span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300 hover:bg-red-500/20 transition">
            <Phone size={16} />
            <span>Leave</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 p-4">
        {messages.length === 0 && (
          <div className="text-center text-neutral-500 text-sm">Start the conversation…</div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[85%] rounded-lg border px-3 py-2 text-sm ${
            m.me
              ? 'ml-auto border-green-500/20 bg-green-500/10 text-green-100'
              : 'mr-auto border-white/10 bg-white/5 text-neutral-200'
          }`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tt.placeholder}
            className="min-h-[42px] max-h-40 flex-1 resize-none rounded-md border border-white/10 bg-neutral-900 p-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-400/40"
          />
          <button
            onClick={sendMessage}
            className={`inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-white transition bg-gradient-to-r from-green-500 to-blue-500 hover:brightness-110 ${
              animate ? '' : ''
            }`}
          >
            <Send size={16} />
            <span>{tt.send}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
