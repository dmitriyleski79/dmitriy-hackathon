import { notFound } from 'next/navigation';
import { mockSites } from '@/lib/mock-data';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteHeader } from '@/components/site-header';

interface SitePageProps {
  params: {
    slug: string;
  };
}

export default function SitePage({ params }: SitePageProps) {
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to {site.name}</h1>
            <p className="text-gray-600 mb-6">Manage your site content, navigation, and settings.</p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800">Pages</h3>
                <p className="text-2xl font-bold text-blue-900">{site.pageCount}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800">Users</h3>
                <p className="text-2xl font-bold text-green-900">{site.userCount}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800">Status</h3>
                <p className="text-2xl font-bold text-purple-900 capitalize">{site.status}</p>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{site.recentActivity}</span>
                  <span className="text-xs text-gray-500 ml-auto">{site.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
