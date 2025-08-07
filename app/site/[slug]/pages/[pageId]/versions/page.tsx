import { notFound } from 'next/navigation';
import { mockSites } from '@/lib/mock-data';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteHeader } from '@/components/site-header';
import { VersionHistory } from '@/components/version-history';

interface VersionsPageProps {
  params: {
    slug: string;
    pageId: string;
  };
}

// Mock version data
const mockVersions = [
  {
    id: '1',
    version_number: 3,
    title: 'Welcome Page',
    content: '<h1>Welcome to HR!</h1><p>This is the latest version of our welcome page.</p>',
    status: 'PUBLISHED' as const,
    created_by: {
      id: '1',
      name: 'John Admin',
      email: 'john.admin@company.com'
    },
    created_at: new Date('2024-01-20T10:30:00'),
    is_current: true
  },
  {
    id: '2',
    version_number: 2,
    title: 'Welcome Page',
    content: '<h1>Welcome to HR!</h1><p>Updated content with new information.</p>',
    status: 'PUBLISHED' as const,
    created_by: {
      id: '1',
      name: 'John Admin',
      email: 'john.admin@company.com'
    },
    created_at: new Date('2024-01-18T14:15:00'),
    is_current: false
  },
  {
    id: '3',
    version_number: 1,
    title: 'Welcome Page',
    content: '<h1>Welcome to HR!</h1><p>Initial version of the welcome page.</p>',
    status: 'PUBLISHED' as const,
    created_by: {
      id: '1',
      name: 'John Admin',
      email: 'john.admin@company.com'
    },
    created_at: new Date('2024-01-15T09:00:00'),
    is_current: false
  }
];

export default async function VersionsPage({ params }: VersionsPageProps) {
  const site = mockSites.find(s => s.slug === (await params).slug);

  if (!site) {
    notFound();
  }

  const handleRestore = (version: typeof mockVersions[0]) => {
    // In a real app, this would restore the version
    console.log('Restoring version:', version);
    alert(`Restoring version ${version.version_number}...`);
  };

  const handlePreview = (version: typeof mockVersions[0]) => {
    // In a real app, this would show a preview
    console.log('Previewing version:', version);
    alert(`Previewing version ${version.version_number}...`);
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Version History</h1>
              <p className="text-gray-600">Track changes and restore previous versions of this page</p>
            </div>

            <VersionHistory
              versions={mockVersions}
              onRestore={handleRestore}
              onPreview={handlePreview}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
