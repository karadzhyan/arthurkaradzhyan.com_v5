'use client';
import { useState, useEffect } from 'react';
export default function Typer({ text, delay = 0, speed = 25 }) {
  const [d, setD] = useState('');
  const [s, setS] = useState(false);
  useEffect(() => { const t = setTimeout(() => setS(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!s) return;
    let i = 0;
    const t = setInterval(() => { i++; setD(text.slice(0, i)); if (i >= text.length) clearInterval(t); }, speed);
    return () => clearInterval(t);
  }, [s, text, speed]);
  return <>{d}<span style={{ opacity: d.length < text.length ? 1 : 0, transition: 'opacity .3s' }}>|</span></>;
}
