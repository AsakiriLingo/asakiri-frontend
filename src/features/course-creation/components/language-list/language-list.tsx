import React from 'react';
import { Button } from 'react-aria-components';

import { SearchField } from '@/components/search-field';

interface LanguageListProps {
  heading?: string;
  onSelect: (language: string) => void;
}

// Define supported languages
const SUPPORTED_LANGUAGES = [
  'English',
  'Spanish',
  'Japanese',
  'Chinese',
  'Korean',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Russian',
  'Arabic',
] as const;

export const LanguageList: React.FC<LanguageListProps> = ({
  heading,
  onSelect,
}) => {
  const [searchQuery] = React.useState('');

  const filteredLanguages = SUPPORTED_LANGUAGES.filter((lang) =>
    lang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="language-list__container">
      {heading && <h2 className="heading">{heading}</h2>}
      <SearchField placeholder="Search for Languages" />
      <div className="language-list">
        {filteredLanguages.map((language) => (
          <Button key={language} onPress={() => onSelect(language)}>
            {language}
          </Button>
        ))}
      </div>
    </div>
  );
};
