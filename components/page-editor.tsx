'use client';

import { useState } from 'react';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { RichTextEditor } from './rich-text-editor';

interface PageEditorProps {
  initialContent?: string;
  initialTitle?: string;
  initialSlug?: string;
  onSave: (data: { title: string; slug: string; content: string }) => void;
  onCancel: () => void;
  onPreview?: (data: { title: string; content: string }) => void;
  isEditing?: boolean;
}

export function PageEditor({ 
  initialContent = '', 
  initialTitle = '', 
  initialSlug = '', 
  onSave, 
  onCancel, 
  onPreview,
  isEditing = false 
}: PageEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      alert('Title and slug are required');
      return;
    }

    setIsSaving(true);
    try {
      await onSave({ title: title.trim(), slug: slug.trim(), content });
    } catch (error) {
      console.error('Error saving page:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview({ title, content });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isEditing && !slug) {
      setSlug(generateSlug(newTitle));
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Edit Page' : 'Create New Page'}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {onPreview && (
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving || !title.trim() || !slug.trim()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#3161D1] rounded-md hover:bg-[#2A4FA8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Page'}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter page title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3161D1] focus:border-transparent"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page URL *
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="page-url"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3161D1] focus:border-transparent"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            This will be the URL for your page
          </p>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Content
          </label>
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Start writing your page content..."
            className="min-h-[400px]"
          />
        </div>

        {/* Validation */}
        {(!title.trim() || !slug.trim()) && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-sm text-yellow-800">
              Please fill in all required fields (Title and URL)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
