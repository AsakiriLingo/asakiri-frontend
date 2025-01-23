import React, { useState, ChangeEvent } from 'react';
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
  isTextArea?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  text,
  onChange,
  label,
}: TextFieldProps) => {
  const [textValue, setTextValue] = useState<string>(() => text ?? '');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    onChange?.(e);
  };

  return (
    <AriaTextField className="text-field-base">
      <Label htmlFor={label} className="label">
        {label}
      </Label>
      <Input
        className="text-input"
        value={textValue}
        onChange={handleInputChange}
      />
    </AriaTextField>
  );
};
