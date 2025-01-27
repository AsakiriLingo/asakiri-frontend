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

import { AudioControl } from './components/audio-controls.tsx';
import { ColorControls } from './components/color-controls.tsx';
import { ImageControl } from './components/image-control.tsx';
import { LinkControl } from './components/link-control.tsx';
import { ListControls } from './components/list-controls.tsx';
import { TableControls } from './components/table-controls.tsx';
import { TextFormatting } from './components/text-formatting.tsx';
import { YouTubeControl } from './components/youtube-control.tsx';
import { EditorProps } from './types/editor.types.ts';

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
