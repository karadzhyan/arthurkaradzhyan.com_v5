'use client';
import { useState, useEffect } from 'react';

export default function Counter({ end, suffix, started }) {
  var [v, setV] = useState(0);

  useEffect(function () {
    if (!started) return;
    var n = parseInt(end);
    var step = Math.max(1, Math.ceil(n / 60));
    var c = 0;
    var t = setInterval(function () {
      c += step;
      if (c >= n) {
        setV(n);
        clearInterval(t);
      } else {
        setV(c);
      }
    }, 20);
    return function () { clearInterval(t); };
  }, [started, end]);

  return <>{v.toLocaleString()}{suffix || ''}</>;
}
