import React from 'react';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { NavBar } from '@/components/nav-bar';
import { Seo } from '@/components/seo';
import './profile.scss';
import { ProfileSettings } from '@/features/profile/components/profile-settings';

const ProfileSettingsRoute: React.FC = () => {
  return (
    <>
      <Seo description={'Profile Settings'}></Seo>
      <NavBar />
      <div className="profile-settings">
        <ProfileSettings />
      </div>
      <BottomNavBar />
    </>
  );
};
export default ProfileSettingsRoute;
