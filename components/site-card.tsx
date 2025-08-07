import { Users, FileText, Clock, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SiteCardProps {
  site: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    tenant_id: string;
    created_by: string;
    created_at: Date;
    updated_at: Date;
    tenant: {
      id: string;
      name: string;
      slug: string;
    };
    creator: {
      id: string;
      name: string;
      email: string;
    };
    _count: {
      pages: number;
      assets: number;
    };
  };
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  maintenance: 'bg-yellow-100 text-yellow-800'
};

const departmentColors = {
  'HR': 'bg-blue-100 text-blue-800',
  'Finance': 'bg-green-100 text-green-800',
  'IT': 'bg-purple-100 text-purple-800',
  'Development': 'bg-orange-100 text-orange-800',
  'Sales': 'bg-red-100 text-red-800'
};

export function SiteCard({ site }: SiteCardProps) {
  // Extract department from site name for demo purposes
  const department = site.name.includes('HR') ? 'HR' :
                   site.name.includes('Finance') ? 'Finance' :
                   site.name.includes('IT') ? 'IT' :
                   site.name.includes('Development') ? 'Development' :
                   site.name.includes('Sales') ? 'Sales' : 'Other';

  // Format the last updated date
  const lastUpdated = new Date(site.updated_at).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{site.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{site.description}</p>
          <div className="flex items-center gap-2">
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              departmentColors[department as keyof typeof departmentColors] || 'bg-gray-100 text-gray-800'
            )}>
              {department}
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              Active
            </span>
          </div>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{site._count.pages} pages</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{site._count.assets} assets</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Last updated</span>
          </div>
          <span className="text-xs text-gray-500">{lastUpdated}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <a 
          href={`/site/${site.slug}`}
          className="block w-full bg-[#3161D1] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#2A4FA8] transition-colors text-center"
        >
          Manage Site
        </a>
      </div>
    </div>
  );
}
