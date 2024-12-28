import React, { Key } from 'react';
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue,
} from 'react-aria-components';

import './select.scss';

interface SelectProps {
  options: string[];
  selectedKey?: number | undefined;
  onSelectionChange: (key: Key) => void;
  label?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  selectedKey,
  onSelectionChange,
  label,
}: SelectProps) => {
  return (
    <AriaSelect
      selectedKey={selectedKey ?? undefined}
      onSelectionChange={onSelectionChange}
    >
      {label && <Label>{label}</Label>}
      <Button>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox>
          {options.map((option: string, index: number) => (
            <ListBoxItem id={option} key={index}>
              {option}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
};
