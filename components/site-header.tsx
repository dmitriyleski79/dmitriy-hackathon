'use client';

import { ArrowLeft, Edit, Eye, Save } from 'lucide-react';
import Link from 'next/link';
import { Site } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface SiteHeaderProps {
  site: Site;
}

export function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumb and Site Context */}
        <div className="flex items-center gap-4">
          {/* Back to Dashboard */}
          <Link 
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          
          {/* Separator */}
          <div className="w-px h-4 bg-gray-300"></div>
          
          {/* Site Context */}
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{site.name}</h1>
            <p className="text-sm text-gray-600">{site.department} Department</p>
          </div>
        </div>

        {/* Right side - Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Preview Button */}
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
          
          {/* Edit Button */}
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-[#3161D1] rounded-md hover:bg-[#2A4FA8] transition-colors">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          
          {/* Save Button */}
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
            <Save className="h-4 w-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </header>
  );
}
