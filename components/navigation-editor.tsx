'use client';

import { useState } from 'react';
import { 
  GripVertical, 
  Plus, 
  Trash2, 
  Edit, 
  Eye,
  Save,
  RotateCcw
} from 'lucide-react';

import { cn } from '@/lib/utils';

interface NavigationItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  children?: NavigationItem[];
  isActive?: boolean;
}



const defaultNavigation: NavigationItem[] = [
  {
    id: '1',
    title: 'Home',
    url: '/',
    icon: '🏠',
    isActive: true
  },
  {
    id: '2',
    title: 'About Us',
    url: '/about',
    icon: 'ℹ️',
    children: [
      {
        id: '2-1',
        title: 'Our Mission',
        url: '/about/mission',
        icon: '🎯'
      },
      {
        id: '2-2',
        title: 'Team',
        url: '/about/team',
        icon: '👥'
      }
    ]
  },
  {
    id: '3',
    title: 'Services',
    url: '/services',
    icon: '🛠️',
    children: [
      {
        id: '3-1',
        title: 'Consulting',
        url: '/services/consulting',
        icon: '💼'
      },
      {
        id: '3-2',
        title: 'Training',
        url: '/services/training',
        icon: '📚'
      }
    ]
  },
  {
    id: '4',
    title: 'Contact',
    url: '/contact',
    icon: '📞'
  }
];

export function NavigationEditor() {
  const [navigation, setNavigation] = useState<NavigationItem[]>(defaultNavigation);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const addItem = () => {
    const newItem: NavigationItem = {
      id: Date.now().toString(),
      title: 'New Page',
      url: '/new-page',
      icon: '📄'
    };
    setNavigation([...navigation, newItem]);
  };

  const updateItem = (id: string, updates: Partial<NavigationItem>) => {
    setNavigation(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setNavigation(prev => prev.filter(item => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setNavigation(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const saveNavigation = () => {
    console.log('Saving navigation:', navigation);
  };

  const resetNavigation = () => {
    setNavigation(defaultNavigation);
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => (
    <div key={item.id} className="space-y-2">
      <div className={cn(
        "flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg",
        level > 0 && "ml-6"
      )}>
        <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
        
        <div className="flex items-center gap-2 flex-1">
          <span className="text-lg">{item.icon}</span>
          
          {editingItem === item.id ? (
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(item.id, { title: e.target.value })}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Page title"
              />
              <input
                type="text"
                value={item.url}
                onChange={(e) => updateItem(item.id, { url: e.target.value })}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="/page-url"
              />
            </div>
          ) : (
            <div className="flex-1">
              <div className="font-medium text-gray-900">{item.title}</div>
              <div className="text-sm text-gray-500">{item.url}</div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setEditingItem(editingItem === item.id ? null : item.id)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => toggleItem(item.id)}
            className={cn(
              "px-2 py-1 text-xs rounded transition-colors",
              item.isActive 
                ? "bg-green-100 text-green-800" 
                : "bg-gray-100 text-gray-600"
            )}
          >
            {item.isActive ? 'Active' : 'Inactive'}
          </button>
          
          <button
            onClick={() => deleteItem(item.id)}
            className="p-1 text-red-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {item.children && (
        <div className="space-y-2">
          {item.children.map(child => renderNavigationItem(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Navigation Editor */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Navigation Items</h3>
          <button
            onClick={addItem}
            className="flex items-center gap-2 px-3 py-2 bg-[#3161D1] text-white rounded-md text-sm font-medium hover:bg-[#2A4FA8] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>

        <div className="space-y-3">
          {navigation.map(item => renderNavigationItem(item))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
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
            onClick={resetNavigation}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          
          <button
            onClick={saveNavigation}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Navigation
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Navigation Preview</h3>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="space-y-2">
            {navigation.map(item => (
              <div key={item.id} className="space-y-1">
                <div className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  item.isActive 
                    ? "bg-[#E7F5FF] text-[#3161D1]" 
                    : "text-gray-700 hover:bg-gray-100"
                )}>
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                
                {item.children && (
                  <div className="ml-6 space-y-1">
                    {item.children.map(child => (
                      <div key={child.id} className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                        child.isActive 
                          ? "bg-[#E7F5FF] text-[#3161D1]" 
                          : "text-gray-700 hover:bg-gray-100"
                      )}>
                        <span>{child.icon}</span>
                        <span>{child.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Navigation Tips</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Drag items to reorder them</li>
            <li>• Click the edit icon to modify page details</li>
            <li>• Toggle items active/inactive to control visibility</li>
            <li>• Add nested items by creating child pages</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
