import React from 'react';
import { Button as AriaButton } from 'react-aria-components';

import './button.scss';

interface ButtonProps {
  onPress?: () => void;
  type?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'filled' | 'flat' | 'ghost';
  size?: 'small' | 'medium';
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
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
      {children}
    </AriaButton>
  );
};
