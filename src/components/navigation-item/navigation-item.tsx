import React, { JSX } from 'react';

import './navigation-item.scss';
import { Button } from '@/components/button';

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
    <div className="nav-menu">
      <Button size="small" type="tertiary" href={route} isLink={true}>
        {title}
      </Button>
      {isActive}
    </div>
  );
};
