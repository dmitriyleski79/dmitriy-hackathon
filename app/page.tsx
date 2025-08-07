import { Plus, Building2 } from 'lucide-react';
import { SiteCard } from '@/components/site-card';
import { getSites } from '@/lib/actions/sites';

// For now, we'll use a demo tenant ID - in a real app this would come from auth
const DEMO_TENANT_ID = 'demo-tenant-id';

export default async function Home() {
  const sitesResult = await getSites(DEMO_TENANT_ID);
  const sites = sitesResult.success ? sitesResult.data || [] : [];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Site Collections</h1>
        <p className="text-gray-600">Manage your departmental sites and content</p>
      </div>

      {/* Create New Site Button */}
      <div className="mb-6">
        <button className="flex items-center gap-2 bg-[#3161D1] text-white px-4 py-2 rounded-md hover:bg-[#2A4FA8] transition-colors">
          <Plus className="h-4 w-4" />
          <span>Create New Site</span>
        </button>
      </div>

      {/* Site Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>

      {/* Empty State (if no sites) */}
      {sites.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <Building2 className="h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sites yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first departmental site.</p>
          <button className="bg-[#3161D1] text-white px-4 py-2 rounded-md hover:bg-[#2A4FA8] transition-colors">
            Create Your First Site
          </button>
        </div>
      )}
    </div>
  );
}
