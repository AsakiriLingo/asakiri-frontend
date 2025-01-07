import React from 'react';
import { Input, TextField as AriaTextField } from 'react-aria-components';

import './text-field.scss';

interface TextFieldProps {
  text?: string;
  onChange?: (value: string) => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  text,
  onChange,
}: TextFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <AriaTextField className="text-field-base">
      <Input className="input" value={text} onChange={handleChange} />
    </AriaTextField>
  );
};
