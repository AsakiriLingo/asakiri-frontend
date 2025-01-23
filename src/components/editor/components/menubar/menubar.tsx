import { Editor } from '@tiptap/react';
import React from 'react';

import { AudioControl } from './features/audio-controls.tsx';
import { ColorControls } from './features/color-controls.tsx';
import { ImageControl } from './features/image-control.tsx';
import { LinkControl } from './features/link-control.tsx';
import { ListControls } from './features/list-controls.tsx';
import { TableControls } from './features/table-controls.tsx';
import { TextFormatting } from './features/text-formatting.tsx';
import { YouTubeControl } from './features/youtube-control.tsx';

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
