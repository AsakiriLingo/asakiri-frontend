import BoringAvatar from 'boring-avatars';
import React from 'react';

import './avatar.scss';

interface AvatarProps {
  imageUrl: string | undefined | null;
  firstName: string;
  lastName: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
  firstName,
  lastName,
}) => {
  return (
    <div>
      {imageUrl ? (
        <img
          className="avatar"
          src={imageUrl}
          alt={`${firstName} ${lastName}`}
        />
      ) : (
        <BoringAvatar
          size={42}
          name={`${firstName} ${lastName}`}
          colors={['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']}
        />
      )}
    </div>
  );
};
