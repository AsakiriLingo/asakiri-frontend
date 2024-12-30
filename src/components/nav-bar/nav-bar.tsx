import React from 'react';

import { NavigationItem } from '@/components/navigation-item';
import './nav-bar.scss';

export const NavBar: React.FC = () => {
  const routes = [
    { title: 'Home', route: '/home' },
    { title: 'Teach on Asakiri', route: '/teach' },
  ];
  return (
    <>
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
    </>
  );
};
