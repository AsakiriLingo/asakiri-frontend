import { Bold, Italic, Type, Heading1, Heading2 } from 'lucide-react';
import React from 'react';

import { MenuButton } from '../menu-button.tsx';
import { FeatureProps } from '../menubar.types.ts';

export const TextFormatting: React.FC<FeatureProps> = ({ editor }) => {
  return (
    <>
      <MenuButton
        editor={editor}
        isActive={editor?.isActive('heading', { level: 1 })}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="icon" />
      </MenuButton>
      <MenuButton
        editor={editor}
        isActive={editor?.isActive('heading', { level: 2 })}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="icon" />
      </MenuButton>
      <MenuButton
        editor={editor}
        isActive={editor?.isActive('paragraph')}
        onClick={() => editor?.chain().focus().setParagraph().run()}
      >
        <Type className="icon" />
      </MenuButton>
      <MenuButton
        editor={editor}
        isActive={editor?.isActive('bold')}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <Bold className="icon" />
      </MenuButton>
      <MenuButton
        editor={editor}
        isActive={editor?.isActive('italic')}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <Italic className="icon" />
      </MenuButton>
    </>
  );
};
