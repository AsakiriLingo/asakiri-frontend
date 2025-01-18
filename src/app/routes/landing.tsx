import React from 'react';

import { mockCourseData } from './mock-data';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import { Card } from '@/features/courses/components/card';

import './landing.scss';

const LandingRoute: React.FC = () => {
  return (
    <div className="landing">
      <Head description={'Welcome to Asakiri'}></Head>
      <NavBar />
      <div className="course-grid-container">
        <div className="course-grid">
          {mockCourseData.map((course) => (
            <Card
              key={course.author.id}
              link={course.link}
              title={course.title}
              author={course.author}
              shortDescription={course.shortDescription}
              courseLanguage={course.courseLanguage}
              languageTaught={course.languageTaught}
              thumbnail={course.thumbnail}
            />
          ))}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default LandingRoute;
