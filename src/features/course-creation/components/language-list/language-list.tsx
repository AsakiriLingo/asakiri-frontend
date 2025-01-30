import React, { useState } from 'react';

import { Language, languages as languageData } from './languages';

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
  const [selectedLetter, setSelectedLetter] = useState('A');

  const currentLetterLanguages = languageData.filter(
    (lang) => lang.en.charAt(0).toUpperCase() === selectedLetter
  );

  const filteredLanguages = searchQuery
    ? currentLetterLanguages.filter((lang) =>
        lang.en.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentLetterLanguages;

  const availableLetters = Array.from(
    new Set(languageData.map((lang) => lang.en.charAt(0).toUpperCase()))
  ).sort();

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    setSearchQuery('');
  };

  const columns: Language[][] = [[], [], []];
  const itemsPerColumn = Math.ceil(filteredLanguages.length / 3);

  filteredLanguages.forEach((lang, index) => {
    const columnIndex = Math.floor(index / itemsPerColumn);
    if (columnIndex < 3) {
      columns[columnIndex].push(lang);
    }
  });

  return (
    <div className="language-list">
      {heading && <h2 className="language-list__heading">{heading}</h2>}

      <div className="language-list__search">
        <SearchField placeholder="Search for Languages" value={searchQuery} />
      </div>

      <div className="language-list__alphabet">
        {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ|').map((letter) => (
          <button
            key={letter}
            className={`language-list__letter ${
              selectedLetter === letter ? 'language-list__letter--active' : ''
            } ${
              availableLetters.includes(letter)
                ? 'language-list__letter--available'
                : ''
            }`}
            onClick={() => handleLetterClick(letter)}
            disabled={!availableLetters.includes(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="language-list__content">
        {currentLetterLanguages.length === 0 ? (
          <div className="language-list__no-results">
            No languages starting with letter {selectedLetter}
          </div>
        ) : filteredLanguages.length === 0 ? (
          <div className="language-list__no-results">
            No languages found matching "{searchQuery}"
          </div>
        ) : (
          <div className="language-list__columns">
            {columns.map((columnLanguages, columnIndex) => (
              <div key={columnIndex} className="language-list__column">
                {columnLanguages.map((language) => (
                  <button
                    key={language.code}
                    className="language-list__item"
                    onClick={() => onLanguageSelect?.(language)}
                  >
                    {language.en}
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
