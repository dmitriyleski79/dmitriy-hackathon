import { notFound } from 'next/navigation';
import { mockSites } from '@/lib/mock-data';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteSettings } from '@/components/site-settings';

interface SettingsPageProps {
  params: {
    slug: string;
  };
}

export default function SettingsPage({ params }: SettingsPageProps) {
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
              <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
              <p className="text-gray-600">Configure your site preferences and options</p>
            </div>
            
            <SiteSettings site={site} />
          </div>
        </div>
      </div>
    </div>
  );
}
