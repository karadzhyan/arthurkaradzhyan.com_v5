'use client';
import { useState, useEffect } from 'react';

export default function Typer({ text, delay, speed }) {
  var [d, setD] = useState('');
  var [s, setS] = useState(false);

  useEffect(function () {
    var t = setTimeout(function () { setS(true); }, delay || 0);
    return function () { clearTimeout(t); };
  }, [delay]);

  useEffect(function () {
    if (!s) return;
    var i = 0;
    var t = setInterval(function () {
      i++;
      setD(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed || 25);
    return function () { clearInterval(t); };
  }, [s, text, speed]);

  return <>{d}<span style={{ opacity: d.length < text.length ? 1 : 0, transition: 'opacity .3s' }}>|</span></>;
}
