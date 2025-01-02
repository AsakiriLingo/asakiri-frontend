import React from 'react';

import './editor.scss';

interface EditorProps {
  content: string;
}

export const Editor: React.FC<EditorProps> = ({ content }: EditorProps) => {
  return <div>{content}</div>;
};
