import React from 'react';

import './language-list.scss';
import { SearchField } from '@/components/search-field';

interface LanguageListProps {
  heading?: string;
  // onPress: (language: string) => void;
}

export const LanguageList: React.FC<LanguageListProps> = ({ heading }) => {
  return (
    <div className="language-list__container">
      {heading && <h2 className="heading">{heading}</h2>}
      <SearchField placeholder="Search for Languages" />
      <div>English</div>
      <div>German</div>
    </div>
  );
};
