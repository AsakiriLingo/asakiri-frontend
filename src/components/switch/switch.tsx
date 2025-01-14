import React, { useState } from 'react';
import { Switch as AriaSwitch } from 'react-aria-components';

import './switch.scss';

interface SwitchProps {
  isSelected?: boolean;
  isDisabled?: boolean;
  onChange?: (value: boolean) => void;
  children?: React.ReactNode;
}

export const Switch: React.FC<SwitchProps> = ({
  isSelected = false,
  isDisabled = false,
  onChange,
  children,
}: SwitchProps) => {
  const [isSwitchOn, setSwitchOn] = useState(isSelected);

  const _onChange = (value: boolean) => {
    setSwitchOn((prev) => !prev);
    onChange?.(value);
  };
  return (
    <AriaSwitch
      isDisabled={isDisabled}
      isSelected={isSwitchOn}
      onChange={(value) => _onChange(value)}
    >
      <div className="indicator" />
      {children}
    </AriaSwitch>
  );
};
