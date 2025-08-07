'use client';

import { Grid, Layout, Columns, Rows, Star } from 'lucide-react';

interface TemplatePreviewProps {
  template: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    preview: string;
    features: string[];
    category: string;
    popularity: number;
  };
  isSelected: boolean;
  onClick: () => void;
}

export function TemplatePreview({ template, isSelected, onClick }: TemplatePreviewProps) {
  const getPreviewContent = () => {
    switch (template.id) {
      case 'modern':
        return (
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="w-8 h-4 bg-blue-200 rounded"></div>
              <div className="w-6 h-4 bg-blue-200 rounded"></div>
              <div className="w-6 h-4 bg-blue-200 rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-6 bg-blue-100 rounded"></div>
              <div className="h-6 bg-blue-100 rounded"></div>
            </div>
          </div>
        );
      case 'classic':
        return (
          <div className="flex gap-2">
            <div className="w-3 h-full bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div className="space-y-2">
            <div className="h-3 bg-green-200 rounded"></div>
            <div className="h-3 bg-green-200 rounded w-4/5"></div>
            <div className="h-3 bg-green-200 rounded w-2/3"></div>
          </div>
        );
      case 'portal':
        return (
          <div className="grid grid-cols-2 gap-1">
            <div className="h-4 bg-purple-200 rounded"></div>
            <div className="h-4 bg-purple-200 rounded"></div>
            <div className="h-4 bg-purple-200 rounded"></div>
            <div className="h-4 bg-purple-200 rounded"></div>
          </div>
        );
      default:
        return <div className="h-full bg-gray-200 rounded"></div>;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 hover:scale-105 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-lg'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 rounded-xl ${
          isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {template.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm text-gray-900">{template.name}</h4>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs text-gray-500">{template.popularity}%</span>
            </div>
          </div>
          <p className="text-xs text-gray-600">{template.description}</p>
          <div className="mt-2">
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {template.category}
            </span>
          </div>
        </div>
      </div>
      
      <div className={`h-16 rounded-md ${template.preview} mb-3 p-2`}>
        {getPreviewContent()}
      </div>
      
      <div className="space-y-1">
        {template.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="text-xs text-gray-600">{feature}</span>
          </div>
        ))}
      </div>

      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      )}
    </div>
  );
}
