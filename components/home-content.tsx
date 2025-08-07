'use client';

import { useState } from 'react';
import { Plus, Building2 } from 'lucide-react';
import { SiteCard } from './site-card';
import { CreateSiteModal } from './create-site-modal';
import { Site } from '@/lib/mock-data';

interface HomeContentProps {
  initialSites: Site[];
}

export function HomeContent({ initialSites }: HomeContentProps) {
  const [sites, setSites] = useState<Site[]>(initialSites);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateSite = (data: { name: string; description: string; department: string; layout: string }) => {
    const newSite: Site = {
      id: (sites.length + 1).toString(),
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      description: data.description,
      status: 'active',
      department: data.department,
      recentActivity: `Site created with ${data.layout} template`,
      userCount: 0,
      pageCount: 0,
      lastUpdated: 'Just now'
    };

    setSites([...sites, newSite]);
  };

  return (
    <>
      <div className="p-8">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Collections</h1>
              <p className="text-lg text-gray-600">Manage your departmental sites and content</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Site</span>
            </button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{sites.length}</div>
                  <div className="text-sm text-gray-600">Total Sites</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{sites.filter(s => s.status === 'active').length}</div>
                  <div className="text-sm text-gray-600">Active Sites</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{sites.reduce((sum, site) => sum + site.pageCount, 0)}</div>
                  <div className="text-sm text-gray-600">Total Pages</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{sites.reduce((sum, site) => sum + site.userCount, 0)}</div>
                  <div className="text-sm text-gray-600">Total Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Site Cards Grid */}
        {sites.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {sites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        )}

        {/* Empty State (if no sites) */}
        {sites.length === 0 && (
          <div className="text-center py-20">
            <div className="mx-auto h-24 w-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6">
              <Building2 className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No sites yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Get started by creating your first departmental site to organize your content and collaborate with your team.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Create Your First Site
            </button>
          </div>
        )}
      </div>

      <CreateSiteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSite}
      />
    </>
  );
}
