import React from 'react';
import {
  SearchField as AriaSearchField,
  Label,
  Input,
  Button,
} from 'react-aria-components';

import './search-field.scss';

type SearchFieldProps = {
  label: string;
  buttonLabel: string;
  value?: string;
};

export const SearchField: React.FC<SearchFieldProps> = ({
  label,
  buttonLabel,
  value,
}: SearchFieldProps) => {
  return (
    <AriaSearchField>
      <Label>{label}</Label>
      <Input value={value ?? undefined} />
      <Button>{buttonLabel}</Button>
    </AriaSearchField>
  );
};
