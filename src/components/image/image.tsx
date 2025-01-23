import React from 'react';

import './image.scss';

interface ImageProps {
  src: string;
  height?: string;
  width?: string;
  className?: string;
  alt: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  height = '480px',
  width = '480px',
  className = 'image',
  alt,
}: ImageProps) => {
  return (
    <img
      className={className}
      src={src}
      height={height}
      width={width}
      alt={alt}
    />
  );
};
