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

export const SearchField: React.FC<SearchFieldProps> = (
  props: SearchFieldProps
) => {
  return (
    <AriaSearchField>
      <Label>{props.label}</Label>
      <Input value={props?.label ?? undefined} />
      <Button>{props.buttonLabel}</Button>
    </AriaSearchField>
  );
};
