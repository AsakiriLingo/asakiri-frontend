import { Image } from 'lucide-react';
import React from 'react';

import { FeatureProps } from '../types/menubar.types.ts';

import { MenuButton } from './menu-button.tsx';

export const ImageControl: React.FC<FeatureProps> = ({ editor }) => {
  return (
    <MenuButton
      editor={editor}
      onClick={() => {}}
      disabled
      tooltipText="Image upload coming soon"
    >
      <Image className="icon" />
    </MenuButton>
  );
};
