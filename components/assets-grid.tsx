'use client';

import { 
  FileText, 
  Image, 
  Video, 
  Download, 
  Trash2, 
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  url: string;
}

interface AssetsGridProps {
  assets: Asset[];
}

const typeIcons = {
  image: Image,
  document: FileText,
  video: Video
};

const typeColors = {
  image: 'bg-blue-100 text-blue-800',
  document: 'bg-green-100 text-green-800',
  video: 'bg-purple-100 text-purple-800'
};

export function AssetsGrid({ assets }: AssetsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {assets.map((asset) => {
        const IconComponent = typeIcons[asset.type];
        
        return (
          <div key={asset.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Preview */}
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <IconComponent className="h-12 w-12 text-gray-400" />
            </div>
            
            {/* File Info */}
            <div className="space-y-2">
              <div>
                <h3 className="font-medium text-gray-900 truncate">{asset.name}</h3>
                <p className="text-sm text-gray-500">{asset.size}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                  typeColors[asset.type]
                )}>
                  <IconComponent className="h-3 w-3" />
                  {asset.type}
                </span>
                
                <div className="flex items-center gap-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>Uploaded by {asset.uploadedBy}</p>
                <p>{asset.uploadedDate}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
