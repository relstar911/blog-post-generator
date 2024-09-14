import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TiptapEditorProps {
  content: string;
  onUpdate: (newContent: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onUpdate }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  return <EditorContent editor={editor} />;
};

export default TiptapEditor;
