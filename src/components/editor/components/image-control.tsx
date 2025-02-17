import { Image } from 'lucide-react';
import React, { useRef } from 'react';

import { FeatureProps } from '../types/menubar.types';

import { MenuButton } from './menu-button';

import { toast } from '@/components/toast';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation.ts';
const MAX_FILE_SIZE = 3 * 1024 * 1024;

export const ImageControl: React.FC<FeatureProps> = ({ editor }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile } = useCourseCreationAPI();
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size exceeds 3MB limit.');
      return;
    }
    const imageUrl = await uploadFile(file, 'images');
    if (imageUrl) {
      editor?.commands.setImage({ src: imageUrl });
    }
  };

  return (
    <>
      <MenuButton
        editor={editor}
        onClick={() => fileInputRef.current?.click()}
        tooltipText="Upload image"
      >
        <Image className="icon" />
      </MenuButton>
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />
    </>
  );
};
