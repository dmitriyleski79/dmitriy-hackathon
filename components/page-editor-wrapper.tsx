'use client';

import { useRouter } from 'next/navigation';
import { PageEditor } from './page-editor';

interface PageEditorWrapperProps {
  siteSlug: string;
}

export function PageEditorWrapper({ siteSlug }: PageEditorWrapperProps) {
  const router = useRouter();

  const handleSave = async (data: { title: string; slug: string; content: string }) => {
    // In a real app, this would save to the database
    console.log('Saving page:', data);
    
    // For now, just redirect back to pages list
    router.push(`/site/${siteSlug}/pages`);
  };

  const handleCancel = () => {
    router.push(`/site/${siteSlug}/pages`);
  };

  const handlePreview = (data: { title: string; content: string }) => {
    // In a real app, this would open a preview modal or new tab
    console.log('Preview:', data);
    alert('Preview functionality would open in a new tab or modal');
  };

  return (
    <PageEditor
      onSave={handleSave}
      onCancel={handleCancel}
      onPreview={handlePreview}
    />
  );
}
