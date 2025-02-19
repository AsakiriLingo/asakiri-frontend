import { NodeViewWrapper } from '@tiptap/react';
import React, { useState, useRef } from 'react';

import { Image } from '@/components/image';

interface AudioNodeProps {
  node: {
    attrs: {
      src: string;
    };
  };
}

const AudioPlayer: React.FC<AudioNodeProps> = ({ node }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <NodeViewWrapper as="span" className="inline-audio">
      <audio ref={audioRef} src={node.attrs.src} preload="none" />
      <button
        className="play-pause-button"
        onClick={togglePlayPause}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Image src="/icons/pause.svg" width="24" height="24" alt="pause" />
        ) : (
          <Image src="/icons/play.svg" width="24" height="24" alt="play" />
        )}
      </button>
    </NodeViewWrapper>
  );
};

export default AudioPlayer;
