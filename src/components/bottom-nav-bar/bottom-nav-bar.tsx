import React from 'react';

import './bottom-nav-bar.scss';
import { Image } from '@/components/image';

export const BottomNavBar: React.FC = () => {
  return (
    <div className="bottom-nav-main">
      <div className="bottom-nav-bar">
        <a className="bottom-nav-item" href="./home">
          <Image
            width="24px"
            height="24px"
            src="./icons/home-active.svg"
            alt="Home"
          />
        </a>
        <a className="bottom-nav-item" href="./search">
          <Image
            width="24px"
            height="24px"
            src="./icons/search.svg"
            alt="Search"
          />
        </a>
        <a className="bottom-nav-item" href="./my-learning">
          <Image
            width="24px"
            height="24px"
            src="./icons/my-learning.svg"
            alt="My Learning"
          />
        </a>
        <a className="bottom-nav-item" href="./profile-settings">
          <Image
            width="24px"
            height="24px"
            src="./icons/user.svg"
            alt="Profile"
          />
        </a>
      </div>
    </div>
  );
};
