import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function NotFound() {
  return (
    <div className="page-wrap">
      <SiteNav />

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '120px 48px 80px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 80, fontWeight: 700, color: 'rgba(44,62,58,.08)', lineHeight: 1, marginBottom: 16 }}>
          404
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 400, marginBottom: 16 }}>
          Page Not Found
        </h1>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 14, color: '#888', lineHeight: 1.8, marginBottom: 32 }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
          <Link href="/tools" className="btn-outline">
            Explore Tools
          </Link>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
