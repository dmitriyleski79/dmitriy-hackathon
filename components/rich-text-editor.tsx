'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(
          "p-2 rounded hover:bg-gray-100 transition-colors",
          editor.isActive('bold') ? "bg-gray-200" : ""
        )}
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(
          "p-2 rounded hover:bg-gray-100 transition-colors",
          editor.isActive('italic') ? "bg-gray-200" : ""
        )}
      >
        <Italic className="h-4 w-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          "p-2 rounded hover:bg-gray-100 transition-colors",
          editor.isActive('heading', { level: 1 }) ? "bg-gray-200" : ""
        )}
      >
        <Heading1 className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          "p-2 rounded hover:bg-gray-100 transition-colors",
          editor.isActive('heading', { level: 2 }) ? "bg-gray-200" : ""
        )}
      >
        <Heading2 className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(
          "p-2 rounded hover:bg-gray-100 transition-colors",
          editor.isActive('heading', { level: 3 }) ? "bg-gray-200" : ""
        )}
      >
        <Heading3 className="h-4 w-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "p-2 rounded hover:bg-gray-100 transition-colors",
          editor.isActive('bulletList') ? "bg-gray-200" : ""
        )}
      >
        <List className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          "p-2 rounded hover:bg-gray-100 transition-colors",
          editor.isActive('orderedList') ? "bg-gray-200" : ""
        )}
      >
        <ListOrdered className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(
          "p-2 rounded hover:bg-gray-100 transition-colors",
          editor.isActive('blockquote') ? "bg-gray-200" : ""
        )}
      >
        <Quote className="h-4 w-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      <button
        onClick={() => {
          const url = window.prompt('Enter URL');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={cn(
          "p-2 rounded hover:bg-gray-100 transition-colors",
          editor.isActive('link') ? "bg-gray-200" : ""
        )}
      >
        <LinkIcon className="h-4 w-4" />
      </button>
      <button
        onClick={() => {
          const url = window.prompt('Enter image URL');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-2 rounded hover:bg-gray-100 transition-colors"
      >
        <ImageIcon className="h-4 w-4" />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1"></div>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded hover:bg-gray-100 transition-colors"
      >
        <Undo className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded hover:bg-gray-100 transition-colors"
      >
        <Redo className="h-4 w-4" />
      </button>
    </div>
  );
};

export function RichTextEditor({ content, onChange, placeholder = "Start writing...", className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className={cn("border border-gray-300 rounded-md overflow-hidden", className)}>
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="p-4 min-h-[200px] focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:prose [&_.ProseMirror]:prose-sm [&_.ProseMirror]:max-w-none"
      />
    </div>
  );
}
