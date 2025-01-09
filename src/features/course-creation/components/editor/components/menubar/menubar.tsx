import { Editor } from '@tiptap/react';
import React from 'react';

import { AudioControl } from './features/audio-controls';
import { ColorControls } from './features/color-controls';
import { ImageControl } from './features/image-control';
import { LinkControl } from './features/link-control';
import { ListControls } from './features/list-controls';
import { TableControls } from './features/table-controls';
import { TextFormatting } from './features/text-formatting';
import { YouTubeControl } from './features/youtube-control';

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
