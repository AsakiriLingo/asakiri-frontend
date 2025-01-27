import { Palette } from 'lucide-react';
import React, { useRef, useState } from 'react';

import { FeatureProps } from '../types/menubar.types.ts';

import { ColorPopover } from './color-popover.tsx';
import { MenuButton } from './menu-button.tsx';

export const ColorControls: React.FC<FeatureProps> = ({ editor }) => {
  const [showColorPopover, setShowColorPopover] = useState(false);
  const colorButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <MenuButton
        editor={editor}
        onClick={() => setShowColorPopover(!showColorPopover)}
      >
        <Palette className="icon" />
      </MenuButton>

      {showColorPopover && (
        <ColorPopover
          onClose={() => setShowColorPopover(false)}
          buttonRef={colorButtonRef}
          onSelectColor={(color) => {
            editor?.chain().focus().setColor(color).run();
          }}
        />
      )}
    </>
  );
};
