'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Settings, 
  CreditCard, 
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Sites',
    href: '/',
    icon: Building2,
    description: 'Site Collections'
  },
  {
    name: 'Tenant Configuration',
    href: '/tenant-config',
    icon: Settings,
    description: 'Platform Settings'
  },
  {
    name: 'Licensing Configuration',
    href: '/licensing',
    icon: CreditCard,
    description: 'License Management'
  },
  {
    name: 'Support',
    href: '/support',
    icon: HelpCircle,
    description: 'Help & Support'
  }
];

export function Sidebar() {
  const pathname = usePathname();

  // Don't render sidebar on auth pages
  if (pathname.startsWith('/auth')) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 h-full w-[230px] bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center">
          <Image
            src="/shortpoint-logo.svg"
            alt="ShortPoint"
            width={160}
            height={32}
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#E7F5FF] text-[#3161D1]"
                      : "text-[#5774A8] hover:bg-[#E7F5FF]/50 hover:text-[#3161D1]"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
