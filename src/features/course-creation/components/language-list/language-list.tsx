import React, { useState, useEffect, useCallback } from 'react';

import {
  Language,
  getAlphabeticalLanguages,
  LanguageGroups,
} from './languages';

import { SearchField } from '@/components/search-field';
import './language-list.scss';

interface LanguageListProps {
  heading?: string;
  onLanguageSelect?: (language: Language) => void;
}

export const LanguageList: React.FC<LanguageListProps> = ({
  heading = 'Select language taught',
  onLanguageSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [alphabeticalGroups, setAlphabeticalGroups] = useState<LanguageGroups>(
    {}
  );
  const [currentLanguages, setCurrentLanguages] = useState<Language[]>([]);

  // Initialize alphabetical groups on mount
  useEffect(() => {
    const groups = getAlphabeticalLanguages();
    setAlphabeticalGroups(groups);
    const firstLetter = Object.keys(groups).sort()[0];
    setSelectedLetter(firstLetter);
  }, []);

  // Update current languages when letter changes
  useEffect(() => {
    if (!selectedLetter) return;

    let filtered = alphabeticalGroups[selectedLetter] || [];

    if (searchQuery.trim()) {
      filtered = filtered.filter((lang) =>
        lang.en.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }

    setCurrentLanguages(filtered);
  }, [selectedLetter, alphabeticalGroups, searchQuery]);

  // Get available letters from the groups
  const availableLetters = React.useMemo(() => {
    return Object.keys(alphabeticalGroups).sort();
  }, [alphabeticalGroups]);

  const handleLetterClick = useCallback((letter: string) => {
    setSelectedLetter(letter);
    setSearchQuery('');
  }, []);

  // Organize languages into columns
  const columns = React.useMemo(() => {
    const result: Language[][] = [[], [], []];
    const itemsPerColumn = Math.ceil(currentLanguages.length / 3);

    currentLanguages.forEach((lang, index) => {
      const columnIndex = Math.floor(index / itemsPerColumn);
      if (columnIndex < 3) {
        result[columnIndex].push(lang);
      }
    });

    return result;
  }, [currentLanguages]);

  return (
    <div className="language-list">
      {heading && <h2 className="language-list__heading">{heading}</h2>}

      <div className="language-list__search">
        <SearchField placeholder="Search for Languages" value={searchQuery} />
      </div>

      <div className="language-list__alphabet">
        {availableLetters.map((letter) => (
          <button
            key={letter}
            className={`language-list__letter ${
              selectedLetter === letter ? 'language-list__letter--active' : ''
            } language-list__letter--available`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="language-list__content">
        {currentLanguages.length === 0 ? (
          <div className="language-list__no-results">
            {searchQuery.trim()
              ? `No languages found matching "${searchQuery}"`
              : `No languages starting with letter ${selectedLetter.toUpperCase()}`}
          </div>
        ) : (
          <div className="language-list__columns" key={selectedLetter}>
            {columns.map((columnLanguages, columnIndex) => (
              <div key={columnIndex} className="language-list__column">
                {columnLanguages.map((language) => (
                  <button
                    key={language.code}
                    className="language-list__item"
                    onClick={() => onLanguageSelect?.(language)}
                  >
                    {language.en}
                    {language.native && ` (${language.native})`}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
