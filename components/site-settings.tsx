'use client';

import { useState } from 'react';
import { 
  Settings, 
  Users, 
  Shield, 
  Globe, 
  Save,
  RotateCcw
} from 'lucide-react';
import { Site } from '@/lib/mock-data';

interface SiteSettingsProps {
  site: Site;
}

interface SettingsData {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  isPublic: boolean;
  allowComments: boolean;
  requireApproval: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
  autoSave: boolean;
  versioning: boolean;
}

const defaultSettings: SettingsData = {
  siteName: '',
  siteDescription: '',
  siteUrl: '',
  isPublic: false,
  allowComments: true,
  requireApproval: false,
  maxFileSize: 10,
  allowedFileTypes: ['jpg', 'png', 'pdf', 'doc', 'docx'],
  autoSave: true,
  versioning: true
};

export function SiteSettings({ site }: SiteSettingsProps) {
  const [settings, setSettings] = useState<SettingsData>({
    ...defaultSettings,
    siteName: site.name,
    siteDescription: site.description,
    siteUrl: `https://company.com/${site.slug}`
  });

  const updateSetting = (key: keyof SettingsData, value: string | boolean | number | string[]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    console.log('Saving settings:', settings);
  };

  const resetSettings = () => {
    setSettings({
      ...defaultSettings,
      siteName: site.name,
      siteDescription: site.description,
      siteUrl: `https://company.com/${site.slug}`
    });
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          General Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => updateSetting('siteName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3161D1]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site URL
            </label>
            <input
              type="text"
              value={settings.siteUrl}
              onChange={(e) => updateSetting('siteUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3161D1]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Description
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => updateSetting('siteDescription', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3161D1]"
            />
          </div>
        </div>
      </div>

      {/* Access Control */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Access Control
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Public Access</h4>
              <p className="text-sm text-gray-600">Allow public access to this site</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.isPublic}
                onChange={(e) => updateSetting('isPublic', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3161D1]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Allow Comments</h4>
              <p className="text-sm text-gray-600">Enable comments on pages</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowComments}
                onChange={(e) => updateSetting('allowComments', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3161D1]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Require Approval</h4>
              <p className="text-sm text-gray-600">Require admin approval for content changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireApproval}
                onChange={(e) => updateSetting('requireApproval', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3161D1]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* File Upload Settings */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          File Upload Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum File Size: {settings.maxFileSize} MB
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={settings.maxFileSize}
              onChange={(e) => updateSetting('maxFileSize', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allowed File Types
            </label>
            <div className="flex flex-wrap gap-2">
              {['jpg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].map(type => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.allowedFileTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateSetting('allowedFileTypes', [...settings.allowedFileTypes, type]);
                      } else {
                        updateSetting('allowedFileTypes', settings.allowedFileTypes.filter(t => t !== type));
                      }
                    }}
                    className="rounded border-gray-300 text-[#3161D1] focus:ring-[#3161D1]"
                  />
                  <span className="text-sm text-gray-700">{type.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Settings */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Content Settings
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Auto Save</h4>
              <p className="text-sm text-gray-600">Automatically save content changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => updateSetting('autoSave', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3161D1]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Version History</h4>
              <p className="text-sm text-gray-600">Keep track of content changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.versioning}
                onChange={(e) => updateSetting('versioning', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3161D1]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={resetSettings}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to Defaults
        </button>
        
        <button
          onClick={saveSettings}
          className="flex items-center gap-2 px-4 py-2 bg-[#3161D1] text-white rounded-md text-sm font-medium hover:bg-[#2A4FA8] transition-colors"
        >
          <Save className="h-4 w-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
