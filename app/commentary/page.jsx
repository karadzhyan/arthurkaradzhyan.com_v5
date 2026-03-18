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
