import { PlayCircle } from 'lucide-react';
import React, { useRef, useState } from 'react';

import { FeatureProps } from '../types/menubar.types.ts';

import { MenuButton } from './menu-button.tsx';
import { Popover } from './popover.tsx';

export const YouTubeControl: React.FC<FeatureProps> = ({ editor }) => {
  const [showYoutubePopover, setShowYoutubePopover] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <MenuButton
        ref={buttonRef}
        editor={editor}
        onClick={() => setShowYoutubePopover(!showYoutubePopover)}
        tooltipText="Youtube video"
      >
        <PlayCircle className="icon" />
      </MenuButton>

      {showYoutubePopover && (
        <Popover
          onClose={() => setShowYoutubePopover(false)}
          onSubmit={(url) => editor?.commands.setYoutubeVideo({ src: url })}
          placeholder="Enter YouTube URL"
          buttonRef={buttonRef}
        />
      )}
    </>
  );
};
