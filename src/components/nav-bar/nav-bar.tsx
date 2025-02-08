import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Image } from '@/components/image';
import { NavigationItem } from '@/components/navigation-item';
import { SearchField } from '@/components/search-field';
import ThemeSwitcher from '@/components/theme-switcher/theme-switcher';
import { useAuth } from '@/features/auth/hooks/use-auth';
import './nav-bar.scss';

export const NavBar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const routes = [
    { title: 'Home', route: '/' },
    { title: 'Teach on Asakiri', route: '/teach' },
    { title: 'My Learning', route: '/my-learning' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="nav-container">
      <div className="left-container">
        <Link className="logo" to="/">
          <Image
            width="39px"
            height="41px"
            src="/asakiri-logo.svg"
            alt="Asakiri Logo"
          />
        </Link>
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
        {user ? (
          <div className="right-container">
            <Avatar size={42} username={user.email?.split('@')[0] || 'User'} />
            <Button variant="ghost" size="small" onPress={handleSignOut}>
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="right-container">
            <Button variant="flat" size="small" isLink={true} href="/login">
              Sign In
            </Button>
            <Button size="small" isLink={true} href="/sign-up">
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
