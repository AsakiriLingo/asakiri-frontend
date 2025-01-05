import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

import './editor.scss';

interface EditorProps {
  content: string;
}

export const Editor: React.FC<EditorProps> = ({ content }: EditorProps) => {
  const editor = useEditor({ content, extensions: [StarterKit] });
  return (
    <>
      <EditorContent className="editor" editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
    </>
  );
};
