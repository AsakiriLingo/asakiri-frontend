import React from 'react';

import './language-list.scss';

interface LanguageListProps {
  onPress: (language: string) => void;
}

export const LanguageList: React.FC<LanguageListProps> = ({
  onPress,
}: LanguageListProps) => {
  return <div onClick={() => onPress('')}>LanguageList</div>;
};
