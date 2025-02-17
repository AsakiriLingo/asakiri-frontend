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

import { TextFormatting } from '@/components/editor/components/text-formatting.tsx';
import { EditorProps } from '@/components/editor/types/editor.types.ts';

import '@/components/editor/editor.scss';

export const SimpleTextEditor: React.FC<EditorProps> = ({
  content_html,
  onEditorChange,
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
    <>
      <div className="label-bold">Course Description</div>
      <div className={`tiptap-editor ${!editable ? 'readonly' : ''}`}>
        {editable && (
          <div className="editor-menu">
            <TextFormatting editor={editor} />
          </div>
        )}
        <EditorContent editor={editor} />
      </div>
    </>
  );
};
