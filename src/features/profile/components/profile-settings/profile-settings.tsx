import React, { useState } from 'react';
import { FileTrigger } from 'react-aria-components';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { TextArea } from '@/components/text-area';
import { TextField } from '@/components/text-field';
import './profile-settings.scss';

export const ProfileSettings: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        console.error('Please upload an image file');
        return;
      }

      // Check file size (e.g., 5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        console.error(
          'File is too large. Please upload an image smaller than 5MB'
        );
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <header className="profile-settings__heading">
        <h2 className="profile-settings__title">Profile Settings</h2>
        <div className="actions">
          <Button type="primary" size="small" onPress={() => {}}>
            Save
          </Button>
        </div>
      </header>
      <div className="profile-container">
        <div className="section-container">
          <div className="label-bold">Profile Picture</div>
          <div className="avatar-section">
            <div className="avatar-preview">
              <Avatar
                username="username"
                imageUrl={previewImage || undefined}
                size={96}
              />
            </div>
            <div className="upload-section">
              <FileTrigger
                onSelect={handleFileSelect}
                acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
              >
                <Button size="small" variant="flat">
                  {previewImage ? 'Change Picture' : 'Upload Picture'}
                </Button>
              </FileTrigger>
              {previewImage && (
                <Button
                  size="small"
                  variant="ghost"
                  type="tertiary"
                  onPress={() => setPreviewImage(null)}
                >
                  Remove Picture
                </Button>
              )}
            </div>
          </div>
        </div>
        <TextField label="Your Name" />
        <TextField label="Short Bio" />
        <TextArea label="Full Bio" />
      </div>
    </>
  );
};
