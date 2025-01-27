import { List, ListOrdered } from 'lucide-react';
import React from 'react';

import { FeatureProps } from '../types/menubar.types.ts';

import { MenuButton } from './menu-button.tsx';

export const ListControls: React.FC<FeatureProps> = ({ editor }) => {
  return (
    <>
      <MenuButton
        editor={editor}
        isActive={editor?.isActive('bulletList')}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <List className="icon" />
      </MenuButton>
      <MenuButton
        editor={editor}
        isActive={editor?.isActive('orderedList')}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="icon" />
      </MenuButton>
    </>
  );
};
