import React from 'react';

import { Button } from '@/components/button';
import { NavigationItem } from '@/components/navigation-item';
import { SearchField } from '@/components/search-field';
import ThemeSwitcher from '@/components/theme-switcher/theme-switcher.tsx';
import { useAuthStore } from '@/features/auth/stores/auth-store.ts';

import './nav-bar.scss';

export const NavBar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuthStore();
  const routes = [
    { title: 'Home', route: '/home' },
    { title: 'Teach on Asakiri', route: '/teach' },
  ];

  const handleSignIn = async () => {
    await loginWithRedirect?.();
  };
  return (
    <nav className="nav-container">
      <div className="left-container">
        <svg
          width="39"
          height="41"
          viewBox="0 0 39 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            opacity="0.73"
            cx="15.0238"
            cy="25.6271"
            r="15.0018"
            transform="rotate(89.917 15.0238 25.6271)"
            fill="#F7C40F"
          />
          <path
            opacity="0.81"
            d="M23.1211 38.6132C31.5669 38.6132 38.5663 32.2805 38.5663 24.2876C38.5663 19.2925 36.0275 14.2413 33.1568 10.099C30.2667 5.92878 26.934 2.52978 25.1347 0.812783C23.999 -0.270931 22.2431 -0.270931 21.1074 0.812804C19.3081 2.52978 15.9754 5.92878 13.0853 10.099C10.2146 14.2413 7.67578 19.2925 7.67578 24.2876C7.67578 32.2805 14.6752 38.6132 23.1211 38.6132Z"
            fill="#0EC02B"
          />
        </svg>
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
      {!isAuthenticated && (
        <div className="right-container">
          <ThemeSwitcher />
          <Button variant="flat" size="small" onPress={handleSignIn}>
            Sign In
          </Button>
          <Button size="small">Sign Up</Button>
        </div>
      )}
    </nav>
  );
};
