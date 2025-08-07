'use client';

import { useState } from 'react';
import { Site } from '@/lib/mock-data';
import { Palette, Eye, Save, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeCustomizationProps {
  site: Site;
}

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontFamily: string;
  fontSize: number;
}

const defaultTheme: ThemeSettings = {
  primaryColor: '#3161D1',
  secondaryColor: '#5774A8',
  backgroundColor: '#F5F6FA',
  textColor: '#1F2937',
  borderRadius: 8,
  fontFamily: 'Inter',
  fontSize: 14
};

const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' }
];

export function ThemeCustomization({ site }: ThemeCustomizationProps) {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const updateTheme = (key: keyof ThemeSettings, value: string | number) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  const saveTheme = () => {
    // In a real app, this would save to the database
    console.log('Saving theme:', theme);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Theme Controls */}
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Palette
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => updateTheme('primaryColor', e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => updateTheme('primaryColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="#3161D1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.secondaryColor}
                  onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="#5774A8"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.backgroundColor}
                  onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.backgroundColor}
                  onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="#F5F6FA"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.textColor}
                  onChange={(e) => updateTheme('textColor', e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.textColor}
                  onChange={(e) => updateTheme('textColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="#1F2937"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <select
                value={theme.fontFamily}
                onChange={(e) => updateTheme('fontFamily', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {fontOptions.map(font => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Font Size: {theme.fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="20"
                value={theme.fontSize}
                onChange={(e) => updateTheme('fontSize', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Layout</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Border Radius: {theme.borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={theme.borderRadius}
              onChange={(e) => updateTheme('borderRadius', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
              isPreviewMode
                ? "bg-[#3161D1] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            <Eye className="h-4 w-4" />
            {isPreviewMode ? 'Hide Preview' : 'Show Preview'}
          </button>
          
          <button
            onClick={resetTheme}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          
          <button
            onClick={saveTheme}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Theme
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
        
        <div 
          className="border border-gray-200 rounded-lg overflow-hidden"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            fontFamily: theme.fontFamily,
            fontSize: `${theme.fontSize}px`
          }}
        >
          {/* Preview Header */}
          <div 
            className="px-6 py-4 border-b border-gray-200"
            style={{ backgroundColor: theme.primaryColor, color: 'white' }}
          >
            <h2 className="text-lg font-semibold">{site.name}</h2>
            <p className="text-sm opacity-90">{site.department} Department</p>
          </div>

          {/* Preview Content */}
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2" style={{ color: theme.primaryColor }}>
                  Sample Content
                </h3>
                <p className="text-sm leading-relaxed">
                  This is a preview of how your site will look with the selected theme. 
                  The colors, typography, and layout settings are applied in real-time.
                </p>
              </div>

              <div className="space-y-3">
                <button 
                  className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{ 
                    backgroundColor: theme.primaryColor, 
                    color: 'white',
                    borderRadius: `${theme.borderRadius}px`
                  }}
                >
                  Primary Button
                </button>
                
                <button 
                  className="px-4 py-2 rounded-md text-sm font-medium border transition-colors"
                  style={{ 
                    borderColor: theme.secondaryColor, 
                    color: theme.secondaryColor,
                    borderRadius: `${theme.borderRadius}px`
                  }}
                >
                  Secondary Button
                </button>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2" style={{ color: theme.primaryColor }}>
                  Content Card
                </h4>
                <p className="text-sm text-gray-600">
                  This card demonstrates the border radius and spacing settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
