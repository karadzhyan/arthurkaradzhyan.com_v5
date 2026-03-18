'use client';
import { useState, useEffect, useRef } from 'react';

export default function Counter({ end, suffix, started }) {
  var n = parseInt(end);
  var [v, setV] = useState(n);
  var hasAnimated = useRef(false);

  useEffect(function () {
    if (!started || hasAnimated.current) return;
    hasAnimated.current = true;
    setV(0);
    var c = 0;
    var step = Math.max(1, Math.ceil(n / 60));
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
  }, [started, n]);

  return <>{v.toLocaleString()}{suffix || ''}</>;
}
