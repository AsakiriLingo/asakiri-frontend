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
    <>
      <div>{children}</div>
      <button onClick={toggle}></button>
    </>
  );
};
