'use client';
export default function S({ children, ...p }) {
  return <div style={{ fontFamily: "'Outfit',sans-serif", ...p }}>{children}</div>;
}
