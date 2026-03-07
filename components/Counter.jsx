'use client';
import { useState, useEffect } from 'react';
export default function Counter({ end, suffix = '', started }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!started) return;
    const n = parseInt(end);
    const step = Math.max(1, Math.ceil(n / 60));
    let c = 0;
    const t = setInterval(() => { c += step; if (c >= n) { setV(n); clearInterval(t); } else setV(c); }, 20);
    return () => clearInterval(t);
  }, [started, end]);
  return <>{v}{suffix}</>;
}
