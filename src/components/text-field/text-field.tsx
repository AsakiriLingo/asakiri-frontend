import React, { useState, ChangeEvent } from 'react';
import {
  Input,
  Label,
  TextField as AriaTextField,
  TextArea,
} from 'react-aria-components';

import './text-field.scss';

interface TextFieldProps {
  text?: string;
  onChange?: (value: string) => void;
  label?: string;
  isTextArea?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  text,
  onChange,
  label,
  isTextArea = false,
}: TextFieldProps) => {
  const [textValue, setTextValue] = useState<string>(() => text ?? '');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <AriaTextField className="text-field-base">
      <Label htmlFor={label} className="label">
        {label}
      </Label>
      {isTextArea ? (
        <TextArea
          className="text-area"
          value={textValue}
          onChange={handleTextAreaChange}
        />
      ) : (
        <Input
          className="text-input"
          value={textValue}
          onChange={handleInputChange}
        />
      )}
    </AriaTextField>
  );
};
