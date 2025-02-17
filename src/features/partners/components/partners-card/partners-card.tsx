import React from 'react';
import { Link } from 'react-aria-components';

import { Image } from '@/components/image';
import { Partner } from '@/types/partner.types';
import './partners-card.scss';

interface PartnerCardProps
  extends Omit<Partner, 'id' | 'description' | 'chapters' | 'isPublished'> {
  link: string;
  isPublished?: boolean;
  children?: React.ReactNode;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  title,
  link,
  shortDescription,
  thumbnail,
}: PartnerCardProps) => {
  const card = (
    <div className="card">
      <Image src={thumbnail} alt={title} className="card--thumbnail"></Image>
      <div className="card--content">
        <h2 className="card--content--course-title">{title}</h2>
        <div className="card--content--course-description">
          {shortDescription}
        </div>
      </div>
    </div>
  );

  return link ? <Link href={link}>{card}</Link> : card;
};
