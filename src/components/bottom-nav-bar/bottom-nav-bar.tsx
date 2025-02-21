import React from 'react';
import { useLocation } from 'react-router';

import { Image } from '@/components/image';
import { useAuthStore } from '@/features/auth/stores/auth-store.ts';
import './bottom-nav-bar.scss';

export const BottomNavBar: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  return (
    <div className="bottom-nav-main">
      <div className="bottom-nav-bar">
        <a className="bottom-nav-item" href="/">
          <Image
            width="24px"
            height="24px"
            src={`./icons/home${location.pathname === '/' ? '-active' : ''}.svg`}
            alt="Home"
          />
        </a>
        <a className="bottom-nav-item" href="./search">
          <Image
            width="24px"
            height="24px"
            src={`./icons/search${location.pathname === '/search' ? '-active' : ''}.svg`}
            alt="Search"
          />
        </a>
        {isAuthenticated && (
          <>
            <a className="bottom-nav-item" href="./my-learning">
              <Image
                width="24px"
                height="24px"
                src={`./icons/my-learning${location.pathname === '/my-learning' ? '-active' : ''}.svg`}
                alt="My Learning"
              />
            </a>
            <a className="bottom-nav-item" href="./profile">
              <Image
                width="24px"
                height="24px"
                src={`./icons/user${location.pathname === '/profile' ? '-active' : ''}.svg`}
                alt="Profile"
              />
            </a>
          </>
        )}
      </div>
    </div>
  );
};
