import React, { useState } from 'react';
import {
  Input,
  Label,
  TextField as AriaTextField,
} from 'react-aria-components';

import './text-field.scss';

interface TextFieldProps {
  text?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  text,
  onChange,
  label,
}: TextFieldProps) => {
  const [textValue, setTextValue] = useState<string>(() => text ?? '');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <AriaTextField className="text-field-base">
      <Label htmlFor={label}>{label}</Label>
      <Input className="input" value={textValue} onChange={handleChange} />
    </AriaTextField>
  );
};
