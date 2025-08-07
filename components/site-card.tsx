import { Users, FileText, Clock, MoreVertical, ArrowRight, Globe, Activity, Settings, Edit, Eye, Trash2, Copy, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import { Tooltip } from './tooltip';

interface SiteCardProps {
  site: {
    id: string;
    name: string;
    slug: string;
    description: string;
    status: 'active' | 'inactive' | 'maintenance';
    department: string;
    recentActivity: string;
    userCount: number;
    pageCount: number;
    lastUpdated: string;
    layout?: string;
  };
}

const departmentColors = {
  'HR': 'bg-gradient-to-r from-blue-500 to-blue-600',
  'Finance': 'bg-gradient-to-r from-green-500 to-green-600',
  'IT': 'bg-gradient-to-r from-purple-500 to-purple-600',
  'Development': 'bg-gradient-to-r from-orange-500 to-orange-600',
  'Sales': 'bg-gradient-to-r from-red-500 to-red-600',
  'Other': 'bg-gradient-to-r from-gray-500 to-gray-600'
};

const statusColors = {
  'active': 'bg-gradient-to-r from-green-500 to-emerald-500',
  'inactive': 'bg-gradient-to-r from-gray-400 to-gray-500',
  'maintenance': 'bg-gradient-to-r from-yellow-500 to-orange-500'
};

export function SiteCard({ site }: SiteCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract department from site name for demo purposes
  const department = site.name.includes('HR') ? 'HR' :
                   site.name.includes('Finance') ? 'Finance' :
                   site.name.includes('IT') ? 'IT' :
                   site.name.includes('Development') ? 'Development' :
                   site.name.includes('Sales') ? 'Sales' : 'Other';

  // Format the last updated date
  const lastUpdated = site.lastUpdated;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickAction = async (action: string) => {
    setIsLoading(true);
    setShowDropdown(false);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    switch (action) {
      case 'view':
        window.open(`/site/${site.slug}`, '_blank');
        break;
      case 'edit':
        window.location.href = `/site/${site.slug}/settings`;
        break;
      case 'duplicate':
        // Simulate duplicating site
        console.log('Duplicating site:', site.name);
        alert(`Site "${site.name}" has been duplicated successfully!`);
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete "${site.name}"? This action cannot be undone.`)) {
          console.log('Deleting site:', site.name);
          alert(`Site "${site.name}" has been deleted successfully!`);
        }
        break;
    }
    
    setIsLoading(false);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Gradient Header */}
      <div className={cn(
        "h-2 w-full",
        departmentColors[department as keyof typeof departmentColors] || departmentColors.Other
      )} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{site.name}</h3>
                                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold text-white",
                      departmentColors[department as keyof typeof departmentColors] || departmentColors.Other
                    )}>
                      {department}
                    </span>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold text-white",
                      statusColors[site.status]
                    )}>
                      {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                    </span>
                    {site.layout && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {site.layout}
                      </span>
                    )}
                  </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{site.description}</p>
          </div>
          <div className="relative" ref={dropdownRef}>
            <Tooltip content="More options">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </Tooltip>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                <button
                  onClick={() => handleQuickAction('view')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  View Site
                </button>
                <button
                  onClick={() => handleQuickAction('edit')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={() => handleQuickAction('duplicate')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  Duplicate
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => handleQuickAction('delete')}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Site
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{site.pageCount}</div>
                <div className="text-xs text-gray-600">Pages</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900">{site.userCount}</div>
                <div className="text-xs text-gray-600">Users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Recent Activity</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{site.recentActivity}</span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleQuickAction('view')}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              <>
                <span>Manage Site</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          
          <Tooltip content="Site Settings">
            <button
              onClick={() => handleQuickAction('edit')}
              disabled={isLoading}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Settings className="h-4 w-4" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
