import React, { useState } from 'react';
import {
  Label,
  TextField as AriaTextField,
  TextArea as AriaTextArea,
} from 'react-aria-components';

import './text-area.scss';

interface TextAreaProps {
  text?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  text,
  onChange,
  label,
}: TextAreaProps) => {
  const [textValue, setTextValue] = useState<string>(() => text ?? '');

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    onChange?.(e);
  };
  return (
    <AriaTextField className="text-area-base">
      <Label htmlFor={label} className="label">
        {label}
      </Label>
      <AriaTextArea
        className="text-area"
        value={textValue}
        onChange={handleTextAreaChange}
      ></AriaTextArea>
    </AriaTextField>
  );
};
