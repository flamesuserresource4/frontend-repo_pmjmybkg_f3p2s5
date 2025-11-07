import { useMemo, useState } from 'react';

const t = {
  en: {
    title: 'Join LandJav',
    subtitle: 'Create an account with email or phone',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    password: 'Password',
    haveAccount: 'Already have an account?',
    noAccount: "Don't have an account?",
    register: 'Register',
    login: 'Log in',
    or: 'or',
    successRegister: 'Account created! You are logged in.',
    successLogin: 'Welcome back!',
    error: 'Something went wrong',
  },
  ru: {
    title: 'Присоединяйтесь к LandJav',
    subtitle: 'Создайте аккаунт по email или номеру телефона',
    name: 'Имя',
    email: 'Email',
    phone: 'Телефон',
    password: 'Пароль',
    haveAccount: 'Уже есть аккаунт?',
    noAccount: 'Нет аккаунта?',
    register: 'Зарегистрироваться',
    login: 'Войти',
    or: 'или',
    successRegister: 'Аккаунт создан! Вы вошли.',
    successLogin: 'С возвращением!',
    error: 'Произошла ошибка',
  },
};

export default function AuthPanel({ lang = 'ru', onAuth, animate = true }) {
  const [mode, setMode] = useState('register'); // 'register' | 'login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const tt = t[lang];

  const backend = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '');

  async function submit(e) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const url = `${backend}${mode === 'register' ? '/auth/register' : '/auth/login'}`;
      const payload = mode === 'register'
        ? { name, email: email || null, phone: phone || null, password }
        : { email: email || null, phone: phone || null, password };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Request failed');

      setMessage({ type: 'success', text: mode === 'register' ? tt.successRegister : tt.successLogin });
      onAuth?.(data);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || tt.error });
    } finally {
      setLoading(false);
    }
  }

  const hint = useMemo(() => {
    return mode === 'register' ? (
      <p className="text-xs text-neutral-400">
        {tt.haveAccount} <button onClick={() => setMode('login')} className="text-green-300 hover:underline">{tt.login}</button>
      </p>
    ) : (
      <p className="text-xs text-neutral-400">
        {tt.noAccount} <button onClick={() => setMode('register')} className="text-green-300 hover:underline">{tt.register}</button>
      </p>
    );
  }, [mode, tt.haveAccount, tt.login, tt.noAccount, tt.register]);

  return (
    <section className="rounded-xl border border-white/10 bg-neutral-900/50 p-4">
      <div className="mb-3">
        <h3 className="text-sm font-medium text-neutral-200">{tt.title}</h3>
        <p className="text-xs text-neutral-400">{tt.subtitle}</p>
      </div>
      {message && (
        <div className={`mb-3 rounded-md border px-3 py-2 text-xs ${
          message.type === 'success'
            ? 'border-green-500/30 bg-green-500/10 text-green-200'
            : 'border-red-500/30 bg-red-500/10 text-red-200'
        }`}>
          {message.text}
        </div>
      )}
      <form onSubmit={submit} className="grid grid-cols-1 gap-2">
        {mode === 'register' && (
          <div className="grid gap-1">
            <label className="text-xs text-neutral-400">{tt.name}</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-md border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-green-400/40"
            />
          </div>
        )}
        <div className="grid gap-1">
          <label className="text-xs text-neutral-400">{tt.email} <span className="text-neutral-500">({tt.or})</span></label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@mail.com"
            className="rounded-md border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-green-400/40"
          />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-neutral-400">{tt.phone} <span className="text-neutral-500">({tt.or})</span></label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 900 000 00 00"
            className="rounded-md border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-green-400/40"
          />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-neutral-400">{tt.password}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-md border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-green-400/40"
          />
        </div>
        <div className="flex items-center justify-between pt-1">
          {hint}
          <button
            disabled={loading}
            className={`inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-white transition bg-gradient-to-r from-green-500 to-blue-500 hover:brightness-110 disabled:opacity-60 ${
              animate ? '' : ''
            }`}
          >
            {mode === 'register' ? tt.register : tt.login}
          </button>
        </div>
      </form>
    </section>
  );
}
