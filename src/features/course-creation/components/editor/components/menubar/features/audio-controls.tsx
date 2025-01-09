import { AudioLines } from 'lucide-react';
import React from 'react';

import { MenuButton } from '../menu-button';
import { FeatureProps } from '../menubar.types';

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
