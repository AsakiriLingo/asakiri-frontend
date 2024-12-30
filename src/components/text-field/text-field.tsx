import React from 'react';
import {
  Input,
  Label,
  TextField as AriaTextField,
} from 'react-aria-components';

import './text-field.scss';

interface TextFieldProps {
  label: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
}: TextFieldProps) => {
  return (
    <AriaTextField className={`text-field-base`}>
      <Label className={`label`}>{label}</Label>
      <Input className={`input`} />
    </AriaTextField>
  );
};
