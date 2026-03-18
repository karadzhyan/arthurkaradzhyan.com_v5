import Link from 'next/link';
import { commentary } from '@/data/commentary';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export var metadata = {
  title: 'Commentary — Legal Developments & Analysis | Arthur Karadzhyan',
  description: 'Timely analysis of California employment law developments, PAGA case law, and defense strategy updates from Arthur Karadzhyan.',
  openGraph: {
    title: 'Commentary | Arthur Karadzhyan',
    description: 'Timely analysis of California employment law developments, PAGA case law, and defense strategy.',
    type: 'website',
  },
};

function formatShort(dateStr) {
  var d = new Date(dateStr + 'T00:00:00');
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[d.getMonth()] + ' ' + d.getFullYear();
}

export default function CommentaryIndex() {
  var sorted = commentary.slice().sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="page-wrap">
      <SiteNav current="Commentary" />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 48px 120px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 48, fontWeight: 300, color: '#2c3e3a', opacity: 0.18, lineHeight: 1 }}>—</div>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: 5, textTransform: 'uppercase', color: '#2c3e3a', margin: 0 }}>Commentary</h1>
          <div style={{ flex: 1, height: 1, background: '#ddd' }} />
        </div>
        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: '#888', lineHeight: 1.7, marginBottom: 48 }}>
          Timely analysis of California employment law developments, pending Supreme Court decisions, and defense strategy updates.
        </p>

        {sorted.map(function(item) {
          return (
            <Link key={item.slug} href={'/commentary/' + item.slug} style={{ textDecoration: 'none', display: 'block', padding: '28px 0', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 11, fontWeight: 500, color: '#999', minWidth: 80, flexShrink: 0, paddingTop: 4 }}>
                  {formatShort(item.date)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.35, marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, color: '#888', lineHeight: 1.7 }}>{item.summary}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                    {item.tags && item.tags.map(function(tag, j) {
                      return <span key={j} style={{ fontFamily: "'Outfit',sans-serif", fontSize: 8, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: '#2c3e3a', padding: '2px 6px', background: '#f0f5f4' }}>{tag}</span>;
                    })}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <SiteFooter />
    </div>
  );
}
