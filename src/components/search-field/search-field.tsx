import { Search } from 'lucide-react';
import React from 'react';
import {
  SearchField as AriaSearchField,
  Label,
  Input,
  Button,
} from 'react-aria-components';

import './search-field.scss';

type SearchFieldProps = {
  label?: string;
  buttonLabel?: string;
  value?: string;
  placeholder?: string;
};

export const SearchField: React.FC<SearchFieldProps> = ({
  label,
  value,
  placeholder,
}: SearchFieldProps) => {
  return (
    <AriaSearchField className={`search-field`}>
      <Button className={`icon`}>
        <Search size={20} className="search-icon" />
      </Button>
      <Label>{label}</Label>
      <Input
        value={value ?? undefined}
        className={`input`}
        placeholder={placeholder}
      />
    </AriaSearchField>
  );
};
