import { Color } from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import TableExtension from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import TextStyle from '@tiptap/extension-text-style';
import Youtube from '@tiptap/extension-youtube';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

import { AudioControl } from './components/menubar/features/audio-controls.tsx';
import { ColorControls } from './components/menubar/features/color-controls.tsx';
import { ImageControl } from './components/menubar/features/image-control.tsx';
import { LinkControl } from './components/menubar/features/link-control.tsx';
import { ListControls } from './components/menubar/features/list-controls.tsx';
import { TableControls } from './components/menubar/features/table-controls.tsx';
import { TextFormatting } from './components/menubar/features/text-formatting.tsx';
import { YouTubeControl } from './components/menubar/features/youtube-control.tsx';
import { EditorProps } from './editor.types.ts';

import './editor.scss';

export const Editor: React.FC<EditorProps> = ({
  content,
  onChange,
  placeholder = 'Start typing...',
  editable = true,
  autoFocus = false,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
        modestBranding: true,
        HTMLAttributes: {
          class: 'editor-youtube',
        },
      }),
      TableExtension.configure({
        resizable: true,
        cellMinWidth: 100,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      Color,
    ],
    content,
    editable,
    autofocus: autoFocus,
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content',
        'data-placeholder': placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  return (
    <div className={`tiptap-editor ${!editable ? 'readonly' : ''}`}>
      {editable && (
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
      )}
      <EditorContent editor={editor} />
    </div>
  );
};
