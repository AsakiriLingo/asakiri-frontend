import React, { useState, useRef } from 'react';

import './audio-player.scss';
import { Image } from '@/components/image';

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
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
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onEnded={() => setIsPlaying(false)}
      />
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
    </div>
  );
};

export default AudioPlayer;
