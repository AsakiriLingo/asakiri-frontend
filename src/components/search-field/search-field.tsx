import { Search } from 'lucide-react';
import React, { ChangeEvent } from 'react';

import './search-field.scss';

type SearchFieldProps = {
  label?: string;
  buttonLabel?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchField: React.FC<SearchFieldProps> = ({
  label,
  value,
  placeholder,
  onChange,
}: SearchFieldProps) => {
  return (
    <div className="search-field">
      <button className="icon" type="button">
        <Search size={20} className="search-icon" />
      </button>
      {label && <label>{label}</label>}
      <input
        type="text"
        value={value}
        className="input"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
