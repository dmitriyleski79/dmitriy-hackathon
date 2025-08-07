'use client';

import { useState, useEffect } from 'react';
import { X, Building2, Globe, FileText, Layout, Grid, Columns, Rows, Monitor, Smartphone, Tablet, Sparkles, Zap, Star, Heart, Shield, Users, Settings, BarChart3, Calendar, Mail, MessageSquare, BookOpen, Camera, Music, Video, Gamepad2, Palette, Code, Database, Cloud, Lock, Unlock, Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { TemplatePreview } from './template-preview';

interface CreateSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; department: string; layout: string }) => void;
}

export function CreateSiteModal({ isOpen, onClose, onSubmit }: CreateSiteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: 'HR',
    layout: 'modern'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTemplateAnimation, setSelectedTemplateAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setCurrentStep(1);
      setSelectedCategory('all');
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const templates = [
    {
      id: 'modern',
      name: 'Modern Dashboard',
      description: 'Clean, modern layout with cards and widgets',
      icon: <Grid className="h-6 w-6" />,
      preview: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      features: ['Responsive design', 'Card-based layout', 'Modern UI'],
      category: 'Business',
      popularity: 95
    },
    {
      id: 'classic',
      name: 'Classic Corporate',
      description: 'Traditional corporate layout with sidebar navigation',
      icon: <Layout className="h-6 w-6" />,
      preview: 'bg-gradient-to-br from-gray-50 to-slate-50',
      features: ['Sidebar navigation', 'Traditional layout', 'Professional look'],
      category: 'Corporate',
      popularity: 88
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Simple, clean layout with focus on content',
      icon: <Columns className="h-6 w-6" />,
      preview: 'bg-gradient-to-br from-green-50 to-emerald-50',
      features: ['Minimal design', 'Content-focused', 'Fast loading'],
      category: 'Design',
      popularity: 92
    },
    {
      id: 'portal',
      name: 'Portal Style',
      description: 'Portal-style layout with quick access tiles',
      icon: <Rows className="h-6 w-6" />,
      preview: 'bg-gradient-to-br from-purple-50 to-violet-50',
      features: ['Quick access tiles', 'Portal layout', 'User-friendly'],
      category: 'Portal',
      popularity: 87
    },
    {
      id: 'creative',
      name: 'Creative Studio',
      description: 'Bold, creative layout for design teams',
      icon: <Palette className="h-6 w-6" />,
      preview: 'bg-gradient-to-br from-pink-50 to-rose-50',
      features: ['Creative design', 'Bold colors', 'Artistic layout'],
      category: 'Creative',
      popularity: 78
    },
    {
      id: 'tech',
      name: 'Tech Hub',
      description: 'Technology-focused layout for dev teams',
      icon: <Code className="h-6 w-6" />,
      preview: 'bg-gradient-to-br from-cyan-50 to-teal-50',
      features: ['Code-friendly', 'Tech-focused', 'Developer tools'],
      category: 'Technology',
      popularity: 91
    },
    {
      id: 'social',
      name: 'Social Network',
      description: 'Social media style layout',
      icon: <Users className="h-6 w-6" />,
      preview: 'bg-gradient-to-br from-orange-50 to-amber-50',
      features: ['Social features', 'User profiles', 'Community tools'],
      category: 'Social',
      popularity: 85
    },
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      description: 'Data-driven layout with charts and metrics',
      icon: <BarChart3 className="h-6 w-6" />,
      preview: 'bg-gradient-to-br from-indigo-50 to-blue-50',
      features: ['Data visualization', 'Charts & graphs', 'Metrics focus'],
      category: 'Analytics',
      popularity: 89
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Store',
      description: 'Online store layout with product showcase',
      icon: <ShoppingBag className="h-6 w-6" />,
      preview: 'bg-gradient-to-br from-emerald-50 to-green-50',
      features: ['Product catalog', 'Shopping cart', 'Payment integration'],
      category: 'E-commerce',
      popularity: 82
    },
    {
      id: 'education',
      name: 'Learning Platform',
      description: 'Educational layout for courses and learning',
      icon: <BookOpen className="h-6 w-6" />,
      preview: 'bg-gradient-to-br from-violet-50 to-purple-50',
      features: ['Course management', 'Learning tools', 'Progress tracking'],
      category: 'Education',
      popularity: 84
    },
    {
      id: 'media',
      name: 'Media Center',
      description: 'Media-rich layout for content creators',
      icon: <Video className="h-6 w-6" />,
      preview: 'bg-gradient-to-br from-red-50 to-pink-50',
      features: ['Media gallery', 'Video player', 'Content management'],
      category: 'Media',
      popularity: 76
    },
    {
      id: 'gaming',
      name: 'Gaming Hub',
      description: 'Gaming-focused layout with dark theme',
      icon: <Gamepad2 className="h-6 w-6" />,
      preview: 'bg-gradient-to-br from-gray-900 to-gray-800',
      features: ['Dark theme', 'Gaming UI', 'Interactive elements'],
      category: 'Gaming',
      popularity: 73
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'Business', name: 'Business', icon: <Building2 className="h-4 w-4" /> },
    { id: 'Corporate', name: 'Corporate', icon: <Shield className="h-4 w-4" /> },
    { id: 'Creative', name: 'Creative', icon: <Palette className="h-4 w-4" /> },
    { id: 'Technology', name: 'Technology', icon: <Code className="h-4 w-4" /> },
    { id: 'Social', name: 'Social', icon: <Users className="h-4 w-4" /> },
    { id: 'Analytics', name: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'E-commerce', name: 'E-commerce', icon: <ShoppingBag className="h-4 w-4" /> },
    { id: 'Education', name: 'Education', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'Media', name: 'Media', icon: <Video className="h-4 w-4" /> },
    { id: 'Gaming', name: 'Gaming', icon: <Gamepad2 className="h-4 w-4" /> }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const departments = [
    { value: 'HR', label: 'Human Resources' },
    { value: 'Finance', label: 'Finance & Accounting' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'Development', label: 'Development' },
    { value: 'Sales', label: 'Sales & Marketing' },
    { value: 'Other', label: 'Other' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      setFormData({ name: '', description: '', department: 'HR', layout: 'modern' });
      onClose();
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    // Найти выбранный шаблон
    const selectedTemplate = templates.find(template => template.id === templateId);
    
    if (selectedTemplate) {
      // Обновить форму с выбранным шаблоном
      setFormData({ ...formData, layout: templateId });
      
      // Запустить анимацию выбора
      setSelectedTemplateAnimation(true);
      setTimeout(() => setSelectedTemplateAnimation(false), 500);
      
      // Показать уведомление о выборе шаблона
      console.log(`Selected template: ${selectedTemplate.name} (${selectedTemplate.category})`);
      
      // Можно добавить звуковой эффект или toast уведомление
    }
  };

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId);
    
    // Если выбрана категория "Все", показать все шаблоны
    if (categoryId === 'all') {
      console.log('Showing all templates');
    } else {
      // Показать количество шаблонов в выбранной категории
      const categoryTemplates = templates.filter(template => template.category === categoryId);
      console.log(`Showing ${categoryTemplates.length} templates in ${categoryId} category`);
    }
  };

  const getSelectedTemplateInfo = () => {
    const selectedTemplate = templates.find(template => template.id === formData.layout);
    return selectedTemplate;
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-ping"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-500 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 bg-pink-500 rounded-full opacity-20 animate-pulse"></div>
        </div>
      </div>

      {/* Modal Content */}
      <div className="relative h-full flex items-center justify-center p-4">
        <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Create Your New Site</h1>
                  <p className="text-blue-100">Choose from our collection of beautiful templates</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-80 bg-gray-50 border-r border-gray-200 p-6">
              <div className="space-y-6">
                {/* Site Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Site Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter site name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Describe what this site will be used for"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                    <span className="text-sm text-gray-500">
                      {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryFilter(category.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.icon}
                        <span className="font-medium">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Template Info */}
                {getSelectedTemplateInfo() && (
                  <div className={`bg-blue-50 border border-blue-200 rounded-xl p-4 transition-all duration-300 ${
                    selectedTemplateAnimation ? 'scale-105 shadow-lg' : ''
                  }`}>
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Selected Template</h4>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getSelectedTemplateInfo()?.icon}
                      </div>
                      <div>
                        <div className="font-medium text-blue-900">{getSelectedTemplateInfo()?.name}</div>
                        <div className="text-xs text-blue-700">{getSelectedTemplateInfo()?.category}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-blue-600">{getSelectedTemplateInfo()?.popularity}% popularity</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs text-blue-700 font-medium mb-1">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {getSelectedTemplateInfo()?.features.slice(0, 2).map((feature, index) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Create Button */}
                <div className="pt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.name.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formData.name.trim() 
                      ? `Create Site with ${getSelectedTemplateInfo()?.name || formData.layout} Template`
                      : 'Enter site name to continue'
                    }
                  </button>
                </div>
              </div>
            </div>

            {/* Template Grid */}
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template, index) => (
                  <div
                    key={template.id}
                    className={`transform transition-all duration-300 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <TemplatePreview
                      template={template}
                      isSelected={formData.layout === template.id}
                      onClick={() => handleTemplateSelect(template.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
