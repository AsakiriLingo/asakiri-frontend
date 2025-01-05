import React from 'react';

import './side-bar-card.scss';

type Section = {
  id: string;
  title: string;
  subtitle: string;
};

interface SideBarCardProps {
  title: string;
  subtitle: string;
  sections: Array<Section>;
}

export const SideBarCard: React.FC<SideBarCardProps> = ({
  title,
  subtitle,
  sections,
}: SideBarCardProps) => {
  return (
    <div>
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle}</div>
      <div className="sections">
        {sections.map((section) => (
          <div className="section" key={section.id}>
            <div className="section-title">{section.title}</div>
            <div className="section-subtitle">{section.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
