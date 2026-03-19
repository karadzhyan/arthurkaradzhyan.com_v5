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

/* Small thematic SVG icons keyed by article slug prefix */
var commentaryIcons = {
  'leeper': function () {
    /* Split circle — severed/headless PAGA claim */
    return (
      <svg viewBox="0 0 32 32" width="32" height="32" style={{ flexShrink: 0 }}>
        <path d="M16 2 A14 14 0 0 1 16 30" fill="#2c3e3a" opacity="0.8" />
        <path d="M16 2 A14 14 0 0 0 16 30" fill="none" stroke="#2c3e3a" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
    );
  },
  'hohenshelt': function () {
    /* Reconnected link — rescued arbitration rights */
    return (
      <svg viewBox="0 0 32 32" width="32" height="32" style={{ flexShrink: 0 }}>
        <rect x="3" y="10" width="12" height="12" rx="3" fill="none" stroke="#2c3e3a" strokeWidth="1.5" />
        <rect x="17" y="10" width="12" height="12" rx="3" fill="none" stroke="#2c3e3a" strokeWidth="1.5" />
        <line x1="15" y1="16" x2="17" y2="16" stroke="#2c3e3a" strokeWidth="1.5" />
      </svg>
    );
  },
  'eighteen': function () {
    /* Capped bar chart — penalty caps */
    return (
      <svg viewBox="0 0 32 32" width="32" height="32" style={{ flexShrink: 0 }}>
        <rect x="5" y="14" width="6" height="14" rx="1" fill="#8aa39e" />
        <rect x="13" y="8" width="6" height="20" rx="1" fill="#2c3e3a" opacity="0.7" />
        <rect x="21" y="11" width="6" height="17" rx="1" fill="#8aa39e" />
        <line x1="3" y1="10" x2="29" y2="10" stroke="#dc3545" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    );
  },
  'commission': function () {
    /* Fractured dollar sign — commission forfeiture */
    return (
      <svg viewBox="0 0 32 32" width="32" height="32" style={{ flexShrink: 0 }}>
        <text x="16" y="24" textAnchor="middle" fontFamily="'Outfit',sans-serif"
          fontSize="22" fontWeight="700" fill="#2c3e3a">$</text>
        <line x1="10" y1="20" x2="22" y2="12" stroke="#CC8800" strokeWidth="1.5" />
      </svg>
    );
  },
};

function getCommentaryIcon(slug) {
  var keys = Object.keys(commentaryIcons);
  for (var i = 0; i < keys.length; i++) {
    if (slug.indexOf(keys[i]) === 0 || slug.indexOf(keys[i]) > -1) {
      return commentaryIcons[keys[i]]();
    }
  }
  return null;
}

export default function CommentaryIndex() {
  var sorted = commentary.slice().sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="page-wrap">
      <SiteNav current="Commentary" />

      <div className="page-header">
        <div className="page-header-inner">
          <div className="page-label">Analysis</div>
          <h1 className="page-title">Commentary</h1>
          <p className="page-desc">
            Timely analysis of California employment law developments, pending
            Supreme Court decisions, and defense strategy updates.
          </p>
        </div>
      </div>

      <div className="page-body" style={{ maxWidth: 800 }}>
        {sorted.map(function(item) {
          return (
            <Link key={item.slug} href={'/commentary/' + item.slug} className="commentary-item">
              <div className="commentary-row">
                <div className="commentary-date">
                  {formatShort(item.date)}
                </div>
                {getCommentaryIcon(item.slug) && (
                  <div style={{ paddingTop: 2, marginRight: 4 }}>
                    {getCommentaryIcon(item.slug)}
                  </div>
                )}
                <div className="commentary-body">
                  <div className="commentary-title">{item.title}</div>
                  <div className="commentary-summary">{item.summary}</div>
                  <div className="commentary-tags">
                    {item.tags && item.tags.map(function(tag, j) {
                      return <span key={j} className="commentary-tag">{tag}</span>;
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
