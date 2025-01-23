import { AudioLines } from 'lucide-react';
import React from 'react';

import { MenuButton } from '../menu-button.tsx';
import { FeatureProps } from '../menubar.types.ts';

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
