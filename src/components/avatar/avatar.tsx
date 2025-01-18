import BoringAvatar from 'boring-avatars';
import React from 'react';

import './avatar.scss';

interface AvatarProps {
  imageUrl?: string | undefined | null;
  username: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ imageUrl, username, size }) => {
  return (
    <div>
      {imageUrl ? (
        <img className="avatar" src={imageUrl} alt={`${username}`} />
      ) : (
        <BoringAvatar
          variant="beam"
          size={size}
          name={`${username}`}
          colors={['#0EC02B', '#F7C40F', '#EEE9E3', '#E82014', '#3ECE55']}
          className="avatar"
        />
      )}
    </div>
  );
};
