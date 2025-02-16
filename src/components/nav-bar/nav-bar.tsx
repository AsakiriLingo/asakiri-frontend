import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Image } from '@/components/image';
import { NavigationItem } from '@/components/navigation-item';
import { SearchField } from '@/components/search-field';
import ThemeSwitcher from '@/components/theme-switcher/theme-switcher';
import { useAuthStore } from '@/features/auth/stores/auth-store';
import './nav-bar.scss';

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const routes = [
    { title: 'Home', route: '/' },
    { title: 'Teach on Asakiri', route: '/teach' },
    { title: 'My Learning', route: '/my-learning' },
  ];

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <nav className="nav-container">
      <div className="left-container">
        <a className="logo" href="/">
          <Image
            width="39px"
            height="41px"
            src="/asakiri-logo.svg"
            alt="Asakiri Logo"
          />
        </a>
        <div className="routes">
          {routes.map((route, index) => (
            <NavigationItem
              key={index}
              route={route.route}
              title={route.title}
              isActive={window.location.pathname === route.route}
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
            <Button
              type="secondary"
              size="small"
              isLink={true}
              href="https://patreon.com/asakiri"
              target="_blank"
            >
              Support Us
            </Button>
            <Button
              type="primary"
              variant="ghost"
              size="small"
              onPress={handleSignOut}
            >
              Sign Out
            </Button>
            <Button
              type="primary"
              variant="ghost"
              size="small"
              onPress={handleProfile}
            >
              <Avatar size={42} username={user?.name || 'User'} />
            </Button>
          </div>
        ) : (
          <div className="right-container">
            <Button variant="flat" size="small" onPress={handleSignIn}>
              Sign In
            </Button>
            <Button size="small" onPress={handleSignUp}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
