import React from 'react';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import './profile-settings.scss';
import { ProfileSettings } from '@/features/profile/components/profile-settings';

const ProfileSettingsRoute: React.FC = () => {
  return (
    <>
      <Head description={'Profile Settings'}></Head>
      <NavBar />
      <div className="profile-settings">
        <ProfileSettings />
      </div>
      <BottomNavBar />
    </>
  );
};
export default ProfileSettingsRoute;
