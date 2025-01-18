import React from 'react';

import { Button } from '@/components/button';
import { Head } from '@/components/seo';
import './profile-settings.scss';
import { ProfileSettings } from '@/features/profile/components/profile-settings';

const ProfileSettingsRoute: React.FC = () => {
  return (
    <>
      <Head description={'Profile Settings'}></Head>
      <div className="profile-header">
        <div className="profile-header__left">
          <Button type="secondary" size="small" onPress={() => {}}>
            Back
          </Button>
          <h1 className="profile-settings__title">Profile Settings</h1>
        </div>
      </div>
      <div className="profile-settings">
        <ProfileSettings />
      </div>
    </>
  );
};
export default ProfileSettingsRoute;
