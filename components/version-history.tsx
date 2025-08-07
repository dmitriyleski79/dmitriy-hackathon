'use client';

import { useState } from 'react';
import { 
  Clock, 
  User, 
  Eye, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  Archive
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Version {
  id: string;
  version_number: number;
  title: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  created_by: {
    id: string;
    name: string;
    email: string;
  };
  created_at: Date;
  is_current: boolean;
}

interface VersionHistoryProps {
  versions: Version[];
  onRestore?: (version: Version) => void;
  onPreview?: (version: Version) => void;
}

const statusIcons = {
  DRAFT: AlertCircle,
  PUBLISHED: CheckCircle,
  ARCHIVED: Archive
};

const statusColors = {
  DRAFT: 'bg-yellow-100 text-yellow-800',
  PUBLISHED: 'bg-green-100 text-green-800',
  ARCHIVED: 'bg-gray-100 text-gray-800'
};

export function VersionHistory({ versions, onRestore, onPreview }: VersionHistoryProps) {
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Version History</h3>
          <p className="text-sm text-gray-600">Track changes and restore previous versions</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {versions.length} version{versions.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Versions List */}
      <div className="space-y-3">
        {versions.map((version) => {
          const StatusIcon = statusIcons[version.status];
          
          return (
            <div
              key={version.id}
              className={cn(
                "bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer",
                selectedVersion?.id === version.id ? "border-[#3161D1] bg-blue-50" : "border-gray-200"
              )}
              onClick={() => setSelectedVersion(version)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        Version {version.version_number}
                      </span>
                      {version.is_current && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                      statusColors[version.status]
                    )}>
                      <StatusIcon className="h-3 w-3" />
                      {version.status}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-1">{version.title}</h4>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{version.created_by.name}</span>
                    </div>
                    <span>{formatDate(version.created_at)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {onPreview && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreview(version);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Preview version"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                  {onRestore && !version.is_current && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRestore(version);
                      }}
                      className="p-2 text-blue-400 hover:text-blue-600 transition-colors"
                      title="Restore version"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Version Details */}
      {selectedVersion && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">
              Version {selectedVersion.version_number} Details
            </h4>
            <button
              onClick={() => setSelectedVersion(null)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-700">Title:</span>
              <p className="text-sm text-gray-900">{selectedVersion.title}</p>
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-700">Content Preview:</span>
              <div 
                className="text-sm text-gray-600 mt-1 max-h-32 overflow-y-auto"
                dangerouslySetInnerHTML={{ 
                  __html: selectedVersion.content.substring(0, 500) + (selectedVersion.content.length > 500 ? '...' : '') 
                }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Created by:</span>
                <p className="text-gray-900">{selectedVersion.created_by.name}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Created:</span>
                <p className="text-gray-900">{formatDate(selectedVersion.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {versions.length === 0 && (
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No versions yet</h3>
          <p className="text-gray-600">Page versions will appear here as you make changes.</p>
        </div>
      )}
    </div>
  );
}
