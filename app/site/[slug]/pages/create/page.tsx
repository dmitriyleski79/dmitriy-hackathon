'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { mockSites } from '@/lib/mock-data';
import { SiteNavigation } from '@/components/site-navigation';
import { SiteHeader } from '@/components/site-header';
import { PageEditor } from '@/components/page-editor';

interface CreatePageProps {
  params: {
    slug: string;
  };
}

export default function CreatePage({ params }: CreatePageProps) {
  const router = useRouter();
  const site = mockSites.find(s => s.slug === params.slug);

  if (!site) {
    notFound();
  }

  const handleSave = async (data: { title: string; slug: string; content: string }) => {
    // In a real app, this would save to the database
    console.log('Saving page:', data);
    
    // For now, just redirect back to pages list
    router.push(`/site/${params.slug}/pages`);
  };

  const handleCancel = () => {
    router.push(`/site/${params.slug}/pages`);
  };

  const handlePreview = (data: { title: string; content: string }) => {
    // In a real app, this would open a preview modal or new tab
    console.log('Preview:', data);
    alert('Preview functionality would open in a new tab or modal');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Site Header */}
      <SiteHeader site={site} />

      {/* Site Navigation and Content */}
      <div className="flex flex-1">
        <SiteNavigation site={site} />

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-50">
          <div className="p-6">
            <PageEditor
              onSave={handleSave}
              onCancel={handleCancel}
              onPreview={handlePreview}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
