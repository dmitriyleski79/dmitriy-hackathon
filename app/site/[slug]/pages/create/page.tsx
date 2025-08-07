import { notFound } from 'next/navigation';
import { mockSites } from '@/lib/mock-data';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteHeader } from '@/components/site-header';
import { PageEditorWrapper } from '@/components/page-editor-wrapper';

interface CreatePageProps {
  params: {
    slug: string;
  };
}

export default async function CreatePage({ params }: CreatePageProps) {
  const site = mockSites.find(s => s.slug === (await params).slug);

  if (!site) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      {/* Site Header */}
      <SiteHeader site={site} />

      {/* Site Navigation and Content */}
      <div className="flex flex-1">
        <SiteNavigation site={site} />

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-50">
          <div className="p-6">
            <PageEditorWrapper siteSlug={(await params).slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
