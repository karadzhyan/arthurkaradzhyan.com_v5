import Link from 'next/link';
import { commentary } from '@/data/commentary';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

/* Thematic SVG icons mapped by primary tag. Each conveys the article's subject. */
var tagIcons = {
  "PAGA": function PagaIcon() {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Scales of justice with split — headless PAGA / arbitration split */}
        <line x1="18" y1="4" x2="18" y2="22" stroke="#2c3e3a" strokeWidth="1.5" />
        <line x1="8" y1="10" x2="28" y2="10" stroke="#2c3e3a" strokeWidth="1.5" />
        <path d="M8 10 L5 18 Q8 22 11 18 Z" fill="#8aa39e" fillOpacity="0.3" stroke="#2c3e3a" strokeWidth="1" />
        <path d="M28 10 L25 18 Q28 22 31 18 Z" fill="#8aa39e" fillOpacity="0.3" stroke="#2c3e3a" strokeWidth="1" />
        <circle cx="18" cy="4" r="2" fill="#2c3e3a" />
        <line x1="12" y1="22" x2="24" y2="22" stroke="#2c3e3a" strokeWidth="1.5" />
        {/* Split indicator */}
        <line x1="18" y1="13" x2="18" y2="19" stroke="#dc3545" strokeWidth="1" strokeDasharray="2 1" />
      </svg>
    );
  },
  "Arbitration": function ArbitrationIcon() {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Clock with warning — payment deadline */}
        <circle cx="18" cy="18" r="12" stroke="#2c3e3a" strokeWidth="1.5" fill="none" />
        <line x1="18" y1="10" x2="18" y2="18" stroke="#2c3e3a" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="18" x2="24" y2="18" stroke="#2c3e3a" strokeWidth="1.5" strokeLinecap="round" />
        {/* Warning triangle */}
        <path d="M28 8 L26 4 L30 4 Z" fill="#CC8800" />
        <line x1="28" y1="5" x2="28" y2="6.5" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" />
        <circle cx="28" cy="7.3" r="0.4" fill="#fff" />
      </svg>
    );
  },
  "PAGA Reform": function ReformIcon() {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bar chart with cap line — penalty reduction */}
        <rect x="6" y="20" width="5" height="10" fill="#8aa39e" fillOpacity="0.5" stroke="#2c3e3a" strokeWidth="0.5" rx="1" />
        <rect x="13" y="14" width="5" height="16" fill="#8aa39e" fillOpacity="0.5" stroke="#2c3e3a" strokeWidth="0.5" rx="1" />
        <rect x="20" y="8" width="5" height="22" fill="#8aa39e" fillOpacity="0.5" stroke="#2c3e3a" strokeWidth="0.5" rx="1" />
        <rect x="27" y="12" width="5" height="18" fill="#8aa39e" fillOpacity="0.5" stroke="#2c3e3a" strokeWidth="0.5" rx="1" />
        {/* Cap line */}
        <line x1="4" y1="16" x2="34" y2="16" stroke="#dc3545" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="4" y1="30" x2="34" y2="30" stroke="#2c3e3a" strokeWidth="1" />
      </svg>
    );
  },
  "Commissions": function CommissionsIcon() {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chain link breaking — forfeiture at separation */}
        <ellipse cx="14" cy="18" rx="7" ry="5" stroke="#2c3e3a" strokeWidth="1.5" fill="none" />
        <ellipse cx="22" cy="18" rx="7" ry="5" stroke="#2c3e3a" strokeWidth="1.5" fill="none" />
        {/* Break mark */}
        <line x1="17" y1="14" x2="19" y2="12" stroke="#dc3545" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="17" y1="22" x2="19" y2="24" stroke="#dc3545" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  },
};

function getIconForItem(item) {
  if (!item.tags || !item.tags.length) return null;
  // Try each tag in order of specificity
  for (var i = 0; i < item.tags.length; i++) {
    if (tagIcons[item.tags[i]]) return tagIcons[item.tags[i]];
  }
  // Fallback: check if first tag contains a key
  if (item.tags[0] === "Commissions" || item.tags[0] === "Automotive" || item.tags[0] === "Novel Theory") return tagIcons["Commissions"];
  if (item.tags[0] === "PAGA Reform" || item.tags[0] === "AB 2288" || item.tags[0] === "Penalty Caps") return tagIcons["PAGA Reform"];
  return null;
}

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
          var IconComponent = getIconForItem(item);
          return (
            <Link key={item.slug} href={'/commentary/' + item.slug} className="commentary-item">
              <div className="commentary-row">
                {IconComponent && (
                  <div className="commentary-icon">
                    <IconComponent />
                  </div>
                )}
                <div className="commentary-date">
                  {formatShort(item.date)}
                </div>
                <div className="commentary-body">
                  <div className="commentary-title">{item.title}</div>
                  <div className="commentary-summary">{item.bottomLine || item.summary}</div>
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
