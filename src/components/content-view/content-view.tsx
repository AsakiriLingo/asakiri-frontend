import React from 'react';

import './content-view.scss';

interface ContentViewProps {
  content: string;
}

export const ContentView: React.FC<ContentViewProps> = ({
  content,
}: ContentViewProps) => {
  return <div>{content}</div>;
};
