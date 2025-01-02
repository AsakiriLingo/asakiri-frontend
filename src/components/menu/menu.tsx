import React from 'react';
import {
  Menu as AriaMenu,
  MenuTrigger,
  MenuItem,
  Popover,
} from 'react-aria-components';

import './menu.scss';

type Item = {
  label: string;
  action?: () => void;
};

interface MenuProps {
  items: Array<Item>;
  children: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ children, items }: MenuProps) => {
  return (
    <MenuTrigger>
      {children}
      <Popover>
        <AriaMenu>
          {items.map((item, index) => (
            <MenuItem onAction={item?.action} key={index}>
              {item.label}
            </MenuItem>
          ))}
        </AriaMenu>
      </Popover>
    </MenuTrigger>
  );
};
