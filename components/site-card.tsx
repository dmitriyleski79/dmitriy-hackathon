import { Users, FileText, Clock, MoreVertical } from 'lucide-react';
import { Site } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface SiteCardProps {
  site: Site;
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
              departmentColors[site.department as keyof typeof departmentColors] || 'bg-gray-100 text-gray-800'
            )}>
              {site.department}
            </span>
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium",
              statusColors[site.status]
            )}>
              {site.status}
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
          <span className="text-sm text-gray-600">{site.userCount} users</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{site.pageCount} pages</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{site.recentActivity}</span>
          </div>
          <span className="text-xs text-gray-500">{site.lastUpdated}</span>
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
