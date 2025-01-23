import React from 'react';

import './chip.scss';

interface ChipProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'primary',
}: ChipProps) => {
  console.log('variant', variant);
  return <div>{children}</div>;
};
