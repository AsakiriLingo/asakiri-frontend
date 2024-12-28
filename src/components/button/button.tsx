import React from 'react';
import { Button as AriaButton } from 'react-aria-components';

import './button.scss';

interface ButtonProps {
  label: string;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return <AriaButton onPress={props.onPress}>{props.label}</AriaButton>;
};
