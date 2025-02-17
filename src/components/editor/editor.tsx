import { Node, mergeAttributes } from '@tiptap/core';
import { Color } from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TableExtension from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import TextStyle from '@tiptap/extension-text-style';
import Youtube from '@tiptap/extension-youtube';
import { useEditor, EditorContent, NodeViewRenderer } from '@tiptap/react';
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

const Audio = Node.create({
  name: 'audio',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
      },
      preload: {
        default: 'none',
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'audio',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'audio',
      mergeAttributes(HTMLAttributes),
      ['source', { src: HTMLAttributes.src, type: 'audio/mpeg' }],
    ];
  },
  addNodeView(): NodeViewRenderer {
    return ({ node }) => {
      const container = document.createElement('div');
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.preload = 'none';
      audio.src = node.attrs.src;
      container.appendChild(audio);
      return {
        dom: container,
      };
    };
  },
});

export const Editor: React.FC<EditorProps> = ({
  content_html,
  onEditorChange,
  placeholder = 'Start typing...',
  editable = true,
  autoFocus = false,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
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
      Audio,
    ],
    content: content_html,
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
      const json = editor.getJSON();
      onEditorChange?.({ html, json });
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
