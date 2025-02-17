import React, { useState, useRef, useEffect } from 'react';

import { PopoverProps } from '../types/editor.types.ts';

export const Popover: React.FC<PopoverProps> = ({
  onClose,
  onSubmit,
  placeholder,
  buttonRef,
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
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
    inputRef.current?.focus();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      onSubmit(value);
      setValue('');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (value) {
        onSubmit(value);
        setValue('');
        onClose();
      }
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="popover" ref={popoverRef}>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </form>
    </div>
  );
};
