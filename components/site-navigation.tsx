'use client';

import { usePathname } from 'next/navigation';
import { 
  Navigation, 
  FileText, 
  Image as ImageIcon, 
  Users, 
  Palette, 
  Settings 
} from 'lucide-react';
import { Site } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface SiteNavigationProps {
  site: Site;
}

const siteNavigationItems = [
  {
    name: 'Navigation',
    href: '/navigation',
    icon: Navigation,
    description: 'Custom page navigation'
  },
  {
    name: 'Pages',
    href: '/pages',
    icon: FileText,
    description: 'Page management'
  },
  {
    name: 'Assets Library',
    href: '/assets',
    icon: ImageIcon,
    description: 'File and media management'
  },
  {
    name: 'Site Team',
    href: '/team',
    icon: Users,
    description: 'Team management'
  },
  {
    name: 'Theme',
    href: '/theme',
    icon: Palette,
    description: 'Visual customization'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Site configuration'
  }
];

export function SiteNavigation({ site }: SiteNavigationProps) {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      {/* Site Info */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-1">{site.name}</h3>
        <p className="text-sm text-gray-600">{site.department} Department</p>
        <div className="mt-2">
          <span className={cn(
            "inline-flex px-2 py-1 rounded-full text-xs font-medium",
            site.status === 'active' 
              ? "bg-green-100 text-green-800" 
              : "bg-gray-100 text-gray-800"
          )}>
            {site.status}
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-1">
          {siteNavigationItems.map((item) => {
            const isActive = pathname.includes(item.href);
            return (
              <li key={item.name}>
                <a
                  href={`/site/${site.slug}${item.href}`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#E7F5FF] text-[#3161D1]"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick Stats */}
      <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Pages</span>
            <span className="font-medium text-gray-900">{site.pageCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Users</span>
            <span className="font-medium text-gray-900">{site.userCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
