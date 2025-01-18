import React from 'react';
import { FileTrigger } from 'react-aria-components';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { TextArea } from '@/components/text-area';
import { TextField } from '@/components/text-field';
import './profile-settings.scss';

export const ProfileSettings: React.FC = () => {
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
            <Avatar username="username" />
            <FileTrigger>
              <Button size="small" variant="flat">
                Upload Picture
              </Button>
            </FileTrigger>
          </div>
        </div>
        <TextField label="Your Name" />
        <TextField label="Short Bio" />
        <TextArea label="Full Bio" />
      </div>
    </>
  );
};
