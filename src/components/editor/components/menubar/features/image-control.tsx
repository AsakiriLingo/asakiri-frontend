import { Image } from 'lucide-react';
import React from 'react';

import { MenuButton } from '../menu-button.tsx';
import { FeatureProps } from '../menubar.types.ts';

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
