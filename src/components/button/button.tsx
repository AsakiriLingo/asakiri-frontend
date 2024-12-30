import React from 'react';
import { Button as AriaButton } from 'react-aria-components';

import './button.scss';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  type?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'filled' | 'flat' | 'ghost';
  size?: 'small' | 'medium';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  type = 'primary',
  variant = 'filled',
  size = 'medium',
}: ButtonProps) => {
  return (
    <AriaButton
      className={`button button--${variant}--${type} button--${size}`}
      onPress={onPress}
    >
      {label}
    </AriaButton>
  );
};
