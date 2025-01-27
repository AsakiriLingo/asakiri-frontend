import { forwardRef } from 'react';

import { MenuButtonProps } from '../types/menubar.types.ts';

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ isActive, onClick, children, tooltipText, disabled }, ref) => {
    const buttonClass = `menu-button ${isActive ? 'is-active' : ''} ${
      tooltipText ? 'tooltip-button' : ''
    }`;

    return (
      <button
        ref={ref}
        onClick={onClick}
        className={buttonClass}
        disabled={disabled}
        data-tooltip={tooltipText}
      >
        {children}
      </button>
    );
  }
);

MenuButton.displayName = 'MenuButton';
