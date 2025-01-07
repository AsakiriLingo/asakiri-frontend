import { ChevronsLeft } from 'lucide-react';
import React, { useState } from 'react';

import './course-sidebar.scss';

interface CourseSidebarProps {
  children?: React.ReactNode;
}

export const CourseSidebar: React.FC<CourseSidebarProps> = ({
  children,
}: CourseSidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <nav className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
      <div className="sidebar__content">{children}</div>
      <button onClick={toggle} className="toggle">
        <ChevronsLeft className="toggle--icon" />
      </button>
    </nav>
  );
};
