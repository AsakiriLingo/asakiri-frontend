import React, { useRef, useEffect } from 'react';

import { COLORS } from '../editor.constants';
import { ColorPopoverProps } from '../editor.types';

export const ColorPopover: React.FC<ColorPopoverProps> = ({
  onClose,
  buttonRef,
  onSelectColor,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="popover color-popover" ref={popoverRef}>
      <div className="color-grid">
        {COLORS.map((option) => (
          <button
            key={option.color}
            className="color-button"
            style={{ backgroundColor: option.color }}
            onClick={() => {
              onSelectColor(option.color);
              onClose();
            }}
            title={option.name}
          />
        ))}
      </div>
    </div>
  );
};
