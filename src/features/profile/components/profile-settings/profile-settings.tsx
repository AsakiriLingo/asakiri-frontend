import React, { useEffect, useState } from 'react';
import { FileTrigger } from 'react-aria-components';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { TextArea } from '@/components/text-area';
import { TextField } from '@/components/text-field';
import './profile-settings.scss';
import { toast } from '@/components/toast';
import { useProfileAPI } from '@/features/profile/api/profile.ts';
import { Profile } from '@/types/domain.types.ts';

export const ProfileSettings: React.FC = () => {
  const { updateProfile, getProfile } = useProfileAPI();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  useEffect(() => {
    getProfile().then((res) => {
      if (res.data) {
        setProfile(res.data);
        if (res.data.avatar_url) {
          setPreviewImage(res.data.avatar_url);
        }
      }
    });
  }, []);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        console.error('Please upload an image file');
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        console.error(
          'File is too large. Please upload an image smaller than 5MB'
        );
        return;
      }
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateField = <K extends keyof Profile>(
    field: K,
    value: Profile[K]
  ) => {
    setProfile((prevProfile) => ({
      ...prevProfile!,
      [field]: value,
    }));
  };
  const handleSaveProfile = async () => {
    if (!profile) return;
    const response = await updateProfile(
      {
        name: profile.name,
        subtitle: profile.subtitle,
        bio: profile.bio,
      },
      profileImageFile
    );

    if (response.error) {
      console.error('Failed to update profile:', response.error.message);
      toast.error('Something went wrong');
    } else {
      toast.success('Profile updated successfully');
      setProfile(response.data);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="profile-settings__heading">
        <h2 className="profile-settings__title">Profile Settings</h2>
        <div className="actions">
          <Button type="primary" size="small" onPress={handleSaveProfile}>
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
                username={profile.name || ''}
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
                  onPress={() => {
                    setPreviewImage(null);
                    setProfileImageFile(null);
                  }}
                >
                  Remove Picture
                </Button>
              )}
            </div>
          </div>
        </div>
        <TextField
          label="Your Name"
          text={profile.name || ''}
          onChange={(e) => updateField('name', e.target.value)}
        />
        <TextField
          label="Short Bio"
          text={profile.subtitle || ''}
          onChange={(e) => updateField('subtitle', e.target.value)}
        />
        <TextArea
          label="Full Bio"
          text={profile.bio || ''}
          onChange={(e) => updateField('bio', e.target.value)}
        />
      </div>
    </>
  );
};
