import { Bold } from '@tiptap/extension-bold';
import { Document } from '@tiptap/extension-document';
import { Heading } from '@tiptap/extension-heading';
import { Italic } from '@tiptap/extension-italic';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Type,
  Heading1,
  Heading2,
} from 'lucide-react';
import React from 'react';

import { MenuButton } from '@/components/editor/components/menu-button';
import './simple-text-editor.scss';

interface SimpleTextEditorProps {
  content: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  label?: string;
  isEditable?: boolean;
}

interface MenuBarProps {
  editor: Editor | null;
}

const SimpleTextMenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="editor-menu">
      <MenuButton
        editor={editor}
        isActive={editor.isActive('heading', { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="icon" />
      </MenuButton>
      <MenuButton
        editor={editor}
        isActive={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="icon" />
      </MenuButton>
      <MenuButton
        editor={editor}
        isActive={editor.isActive('paragraph')}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <Type className="icon" />
      </MenuButton>
      <MenuButton
        editor={editor}
        isActive={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon className="icon" />
      </MenuButton>
      <MenuButton
        editor={editor}
        isActive={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon className="icon" />
      </MenuButton>
    </div>
  );
};

export const SimpleTextEditor: React.FC<SimpleTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start typing...',
  label,
  isEditable = true,
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Paragraph,
      Bold,
      Italic,
      Heading.configure({
        levels: [1, 2],
      }),
    ],
    content,
    editable: isEditable,
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
    <div className="simple-text-editor">
      {label && <div className="label-bold">{label}</div>}
      {isEditable && <SimpleTextMenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        className={!isEditable ? 'readonly' : ''}
      />
    </div>
  );
};
