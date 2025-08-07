import { notFound } from 'next/navigation';
import { mockSites } from '@/lib/mock-data';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteHeader } from '@/components/site-header';
import { AssetsGrid } from '@/components/assets-grid';

interface AssetsPageProps {
  params: {
    slug: string;
  };
}

// Mock assets data
const mockAssets = [
  {
    id: '1',
    name: 'company-logo.png',
    type: 'image',
    size: '2.4 MB',
    uploadedBy: 'John Admin',
    uploadedDate: '2024-01-15',
    url: '/api/placeholder/200/200'
  },
  {
    id: '2',
    name: 'employee-handbook.pdf',
    type: 'document',
    size: '1.8 MB',
    uploadedBy: 'John Admin',
    uploadedDate: '2024-01-12',
    url: '/api/placeholder/200/200'
  },
  {
    id: '3',
    name: 'office-photo.jpg',
    type: 'image',
    size: '3.2 MB',
    uploadedBy: 'John Admin',
    uploadedDate: '2024-01-10',
    url: '/api/placeholder/200/200'
  },
  {
    id: '4',
    name: 'training-video.mp4',
    type: 'video',
    size: '15.7 MB',
    uploadedBy: 'John Admin',
    uploadedDate: '2024-01-08',
    url: '/api/placeholder/200/200'
  },
  {
    id: '5',
    name: 'presentation.pptx',
    type: 'document',
    size: '4.1 MB',
    uploadedBy: 'John Admin',
    uploadedDate: '2024-01-05',
    url: '/api/placeholder/200/200'
  },
  {
    id: '6',
    name: 'team-photo.jpg',
    type: 'image',
    size: '2.9 MB',
    uploadedBy: 'John Admin',
    uploadedDate: '2024-01-03',
    url: '/api/placeholder/200/200'
  }
];

export default async function AssetsPage({ params }: AssetsPageProps) {
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
        <div className="flex-1 bg-white">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Assets Library</h1>
                <p className="text-gray-600">Manage your site files and media</p>
              </div>
              <button className="bg-[#3161D1] text-white px-4 py-2 rounded-md hover:bg-[#2A4FA8] transition-colors">
                Upload Asset
              </button>
            </div>
            
            <AssetsGrid assets={mockAssets} />
          </div>
        </div>
      </div>
    </div>
  );
}
