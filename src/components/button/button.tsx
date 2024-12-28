import React from 'react';
import { Button as AriaButton } from 'react-aria-components';

import './button.scss';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
}: ButtonProps) => {
  return (
    <AriaButton
      className={variant === 'primary' ? 'primary' : 'secondary'}
      onPress={onPress}
    >
      {label}
    </AriaButton>
  );
};
