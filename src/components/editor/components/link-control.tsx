import { Link2 } from 'lucide-react';
import React, { useRef, useState } from 'react';

import { FeatureProps } from '../types/menubar.types.ts';

import { MenuButton } from './menu-button.tsx';
import { Popover } from './popover.tsx';

export const LinkControl: React.FC<FeatureProps> = ({ editor }) => {
  const [showLinkPopover, setShowLinkPopover] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <MenuButton
        ref={buttonRef}
        editor={editor}
        isActive={editor?.isActive('link')}
        onClick={() => setShowLinkPopover(!showLinkPopover)}
      >
        <Link2 className="icon" />
      </MenuButton>

      {showLinkPopover && (
        <Popover
          onClose={() => setShowLinkPopover(false)}
          onSubmit={(url) => {
            if (editor?.state.selection.empty) {
              editor
                .chain()
                .focus()
                .insertContent({
                  type: 'text',
                  marks: [{ type: 'link', attrs: { href: url } }],
                  text: url,
                })
                .run();
            } else {
              editor?.chain().focus().setLink({ href: url }).run();
            }
          }}
          placeholder="Enter URL"
          buttonRef={buttonRef}
        />
      )}
    </>
  );
};
