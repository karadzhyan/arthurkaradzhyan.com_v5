import { getBuiltResourceSlugs, getResourceBySlug } from '@/data/resources';
import ResourcePageClient from './ResourcePageClient';

export function generateStaticParams() {
  return getBuiltResourceSlugs().map(function(slug) { return { slug: slug }; });
}

export function generateMetadata({ params }) {
  var res = getResourceBySlug(params.slug);
  if (!res) return { title: 'Not Found' };
  return {
    title: res.title + ' | Arthur Karadzhyan',
    description: res.metaDescription || res.cardDesc,
    openGraph: {
      title: res.title + ' — ' + res.subtitle + ' | Arthur Karadzhyan',
      description: res.metaDescription || res.cardDesc,
      type: 'article',
    },
  };
}

export default function ResourcePage({ params }) {
  return <ResourcePageClient slug={params.slug} />;
}
