import { notFound } from 'next/navigation';
import { mockSites } from '@/lib/mock-data';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteHeader } from '@/components/site-header';
import { PagesTable } from '@/components/pages-table';

interface PagesPageProps {
  params: {
    slug: string;
  };
}

// Mock pages data
const mockPages = [
  {
    id: '1',
    title: 'Welcome Page',
    status: 'published',
    createdDate: '2024-01-15',
    modifiedDate: '2024-01-20',
    author: 'John Admin',
    views: 245
  },
  {
    id: '2',
    title: 'Employee Handbook',
    status: 'published',
    createdDate: '2024-01-10',
    modifiedDate: '2024-01-18',
    author: 'John Admin',
    views: 189
  },
  {
    id: '3',
    title: 'Company Policies',
    status: 'draft',
    createdDate: '2024-01-12',
    modifiedDate: '2024-01-19',
    author: 'John Admin',
    views: 0
  },
  {
    id: '4',
    title: 'Contact Information',
    status: 'published',
    createdDate: '2024-01-08',
    modifiedDate: '2024-01-15',
    author: 'John Admin',
    views: 156
  },
  {
    id: '5',
    title: 'Training Resources',
    status: 'archived',
    createdDate: '2024-01-05',
    modifiedDate: '2024-01-12',
    author: 'John Admin',
    views: 89
  }
];

export default function PagesPage({ params }: PagesPageProps) {
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
                <p className="text-gray-600">Manage your site pages and content</p>
              </div>
              <a 
                href={`/site/${params.slug}/pages/create`}
                className="bg-[#3161D1] text-white px-4 py-2 rounded-md hover:bg-[#2A4FA8] transition-colors"
              >
                Create New Page
              </a>
            </div>
            
            <PagesTable pages={mockPages} />
          </div>
        </div>
      </div>
    </div>
  );
}
