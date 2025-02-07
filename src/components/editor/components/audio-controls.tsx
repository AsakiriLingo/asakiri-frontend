import { AudioLines } from 'lucide-react';
import React, { useRef } from 'react';

import { FeatureProps } from '../types/menubar.types';

import { MenuButton } from './menu-button';

export const AudioControl: React.FC<FeatureProps> = ({ editor }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    editor?.commands.insertFile(file);
  };

  return (
    <>
      <MenuButton
        editor={editor}
        onClick={() => fileInputRef.current?.click()}
        tooltipText="Upload audio"
      >
        <AudioLines className="icon" />
      </MenuButton>
      <input
        ref={fileInputRef}
        type="file"
        accept=".mp3,.wav"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
    </>
  );
};
