import { notFound } from 'next/navigation';
import { mockSites } from '@/lib/mock-data';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteHeader } from '@/components/site-header';
import { NavigationEditor } from '@/components/navigation-editor';

interface NavigationPageProps {
  params: {
    slug: string;
  };
}

export default function NavigationPage({ params }: NavigationPageProps) {
  const site = mockSites.find(s => s.slug === params.slug);
  
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
        <div className="flex-1 bg-white">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Navigation Structure</h1>
              <p className="text-gray-600">Organize your site navigation menu</p>
            </div>
            
            <NavigationEditor site={site} />
          </div>
        </div>
      </div>
    </div>
  );
}
