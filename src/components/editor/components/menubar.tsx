import { Editor } from '@tiptap/react';
import React from 'react';

import { AudioControl } from './audio-controls.tsx';
import { ColorControls } from './color-controls.tsx';
import { ImageControl } from './image-control.tsx';
import { LinkControl } from './link-control.tsx';
import { ListControls } from './list-controls.tsx';
import { TableControls } from './table-controls.tsx';
import { TextFormatting } from './text-formatting.tsx';
import { YouTubeControl } from './youtube-control.tsx';

interface MenuBarProps {
  editor: Editor | null;
}

export const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="editor-menu">
      <TextFormatting editor={editor} />
      <ListControls editor={editor} />
      <LinkControl editor={editor} />
      <ImageControl editor={editor} />
      <AudioControl editor={editor} />
      <YouTubeControl editor={editor} />
      <TableControls editor={editor} />
      <ColorControls editor={editor} />
    </div>
  );
};
