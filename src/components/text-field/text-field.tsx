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

export const TextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  return (
    <AriaTextField>
      <Label>{props.label}</Label>
      <Input />
    </AriaTextField>
  );
};
