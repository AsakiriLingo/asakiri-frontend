import React, { useState } from 'react';

import { SearchField } from '@/components/search-field';
import { Language } from '@/types/language.types';
import './language-list.scss';

interface LanguageListProps {
  heading?: string;
  languages?: Language[];
  onSelect?: (language: Language) => void;
  isLoading?: boolean;
}

export const LanguageList: React.FC<LanguageListProps> = ({
  heading,
  languages = [],
  onSelect = () => {},
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.name_native?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="language-list__container">
      {heading && <h2 className="heading">{heading}</h2>}
      <SearchField
        placeholder="Search for Languages"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="language-list">
        {isLoading ? (
          <div className="language-list__empty">Loading languages...</div>
        ) : languages.length === 0 ? (
          <div className="language-list__empty">No languages available</div>
        ) : filteredLanguages.length === 0 ? (
          <div className="language-list__empty">
            No languages found matching "{searchTerm}"
          </div>
        ) : (
          filteredLanguages.map((language) => (
            <button
              key={language.id}
              className="language-list__item"
              onClick={() => onSelect(language)}
              type="button"
            >
              <span className="language-name">{language.name_en}</span>
              {language.name_native && (
                <span className="language-native">{language.name_native}</span>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
