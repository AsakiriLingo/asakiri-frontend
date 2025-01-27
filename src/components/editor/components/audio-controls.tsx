import { AudioLines } from 'lucide-react';
import React from 'react';

import { FeatureProps } from '../types/menubar.types.ts';

import { MenuButton } from './menu-button.tsx';

export const AudioControl: React.FC<FeatureProps> = ({ editor }) => {
  return (
    <MenuButton
      editor={editor}
      onClick={() => {}}
      disabled
      tooltipText="Audio upload coming soon"
    >
      <AudioLines className="icon" />
    </MenuButton>
  );
};
