import React from 'react';

import { mockCourseData } from './mock-data.ts';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { Footer } from '@/components/footer';
import { NavBar } from '@/components/nav-bar';
import { Seo } from '@/components/seo';
import './partners.scss';
import { PartnerCard } from '@/features/partners/components/partners-card';

const PartnersRoute: React.FC = () => {
  return (
    <div className="landing">
      <Seo description={'Asakiri | Partners'}></Seo>
      <NavBar />
      <div className="course-grid-container">
        <div className="course-grid">
          {mockCourseData.map((course) => (
            <PartnerCard
              link={course.link}
              title={course.title}
              shortDescription={course.shortDescription}
              thumbnail={course.thumbnail}
            />
          ))}
        </div>
      </div>
      <BottomNavBar />
      <Footer />
    </div>
  );
};

export default PartnersRoute;
