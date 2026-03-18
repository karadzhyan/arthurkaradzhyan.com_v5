import { getAllToolSlugs, getToolBySlug } from '@/data/tools';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ToolPageClient from './ToolPageClient';

export function generateStaticParams() {
  return getAllToolSlugs().map(function(slug) { return { slug: slug }; });
}

export function generateMetadata({ params }) {
  var tool = getToolBySlug(params.slug);
  if (!tool) return { title: 'Not Found' };
  return {
    title: tool.name + ' | Arthur Karadzhyan',
    description: tool.desc,
    openGraph: {
      title: tool.name + ' — Interactive Tool | Arthur Karadzhyan',
      description: tool.sub + '. ' + tool.desc.slice(0, 150),
      type: 'website',
    },
  };
}

export default function ToolPage({ params }) {
  var tool = getToolBySlug(params.slug);
  return (
    <>
      {tool && (
        <BreadcrumbSchema items={[
          { name: 'Home', url: 'https://www.arthurkaradzhyan.com' },
          { name: 'Tools', url: 'https://www.arthurkaradzhyan.com/tools' },
          { name: tool.name, url: 'https://www.arthurkaradzhyan.com/tools/' + params.slug }
        ]} />
      )}
      <ToolPageClient slug={params.slug} />
    </>
  );
}
