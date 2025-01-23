import React from 'react';
import { Button as AriaButton, Link as AriaLink } from 'react-aria-components';

import './button.scss';

interface ButtonProps {
  onPress?: () => void;
  type?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'filled' | 'flat' | 'ghost';
  size?: 'small' | 'medium';
  children?: React.ReactNode;
  isLink?: boolean;
  href?: string;
  target?: string;
  actionType?: 'submit' | 'button' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  type = 'primary',
  variant = 'filled',
  size = 'medium',
  isLink,
  href,
  target,
  actionType = 'button',
}: ButtonProps) => {
  if (isLink && href) {
    return (
      <AriaLink
        className={`button button--${variant}--${type} button--${size}`}
        href={href}
        target={target}
        onPress={onPress}
      >
        {children}
      </AriaLink>
    );
  }
  return (
    <AriaButton
      type={actionType}
      className={`button button--${variant}--${type} button--${size}`}
      onPress={onPress}
    >
      {children}
    </AriaButton>
  );
};
