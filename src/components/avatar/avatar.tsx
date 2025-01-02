import React, { JSX } from 'react';

import './avatar.scss';

interface AvatarProps {
  imageUrl: string | undefined | null;
}

export const Avatar: React.FC<AvatarProps> = ({
  imageUrl,
}: AvatarProps): JSX.Element => {
  return <div>{imageUrl}</div>;
};
