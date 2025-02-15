import React, { useEffect, useState } from 'react';

import { SearchField } from '@/components/search-field';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation.ts';
import { Language } from '@/types/language.types';
import './language-list.scss';

interface LanguageListProps {
  heading?: string;
  onSelect?: (language: Language) => void;
}

export const LanguageList: React.FC<LanguageListProps> = ({
  heading,
  onSelect = () => {},
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [languages, setLanguages] = useState<Language[]>([]);
  const { getLanguages } = useCourseCreationAPI();

  const fetchLanguages = async (term: string = '') => {
    setIsLoading(true);

    const response = await getLanguages(term);

    if (response.error) {
      console.error('Error fetching languages:', response.error);
      setLanguages([]);
    } else {
      setLanguages(response.data || []);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchLanguages(searchTerm);
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

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
          <div className="language-list__empty">
            No languages found matching "{searchTerm}"
          </div>
        ) : (
          languages.map((language) => (
            <button
              key={language.id}
              className="language-list__item"
              onClick={() => onSelect(language)}
              type="button"
            >
              <span className="language-name">{language.name_en}</span>
              {language.name_native && (
                <span className="language-native">
                  ({language.name_native})
                </span>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
