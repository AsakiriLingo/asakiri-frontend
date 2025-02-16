import { Editor } from '@tiptap/react';
import React from 'react';

import { TextFormatting } from './text-formatting.tsx';

interface MenuBarProps {
  editor: Editor | null;
}

export const TextMenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="editor-menu">
      <TextFormatting editor={editor} />
    </div>
  );
};
