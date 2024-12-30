import React, { JSX } from 'react';

import './navigation-item.scss';

interface NavigationItemProps {
  title: string;
  route: string;
  isActive: boolean;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  title,
  route,
  isActive,
}: NavigationItemProps): JSX.Element => {
  return (
    <div>
      {title}
      {route}
      {isActive}
    </div>
  );
};
