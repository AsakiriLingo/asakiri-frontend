import React from 'react';
import { Button as AriaButton } from 'react-aria-components';

import './button.scss';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant: 'primary' | 'secondary';
  color?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  color,
}: ButtonProps) => {
  return (
    <AriaButton
      style={{ color: color }}
      className={variant === 'primary' ? 'primary' : 'secondary'}
      onPress={onPress}
    >
      {label}
    </AriaButton>
  );
};
