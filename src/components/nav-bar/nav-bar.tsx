import React from 'react';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Image } from '@/components/image';
import { NavigationItem } from '@/components/navigation-item';
import { SearchField } from '@/components/search-field';
import ThemeSwitcher from '@/components/theme-switcher/theme-switcher.tsx';
import { useAuthStore } from '@/features/auth/stores/auth-store.ts';
import './nav-bar.scss';

export const NavBar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuthStore();
  const routes = [
    { title: 'Home', route: './' },
    { title: 'Teach on Asakiri', route: './teach' },
    { title: 'My Learning', route: './my-learning' },
  ];

  const handleSignIn = async () => {
    await loginWithRedirect?.();
  };
  return (
    <nav className="nav-container">
      <div className="left-container">
        <a className="logo" href="./">
          <Image
            width="39px"
            height="41px"
            src="/asakiri-logo.svg"
            alt="Asakiri Logo"
          ></Image>
        </a>
        <div className="routes">
          {routes.map((route, index) => (
            <NavigationItem
              key={index}
              route={route.route}
              title={route.title}
              isActive={false}
            />
          ))}
        </div>
        <div className="search-field-container">
          <SearchField placeholder="Search for Courses or Teachers" />
        </div>
      </div>
      <div className="right-container">
        <ThemeSwitcher />
        {isAuthenticated ? (
          <div className="right-container">
            <Avatar size={42} username="Alok" />
          </div>
        ) : (
          <div className="right-container">
            <Button variant="flat" size="small" onPress={handleSignIn}>
              Sign In
            </Button>
            <Button size="small">Sign Up</Button>
          </div>
        )}
      </div>
    </nav>
  );
};
