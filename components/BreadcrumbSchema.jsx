export default function BreadcrumbSchema({ items }) {
  var schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map(function(item, i) {
      return {
        "@type": "ListItem",
        "position": i + 1,
        "name": item.name,
        "item": item.url
      };
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
