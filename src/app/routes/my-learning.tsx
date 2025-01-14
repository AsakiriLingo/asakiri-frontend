import React from 'react';

import { mockCourseData } from './mock-data';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { Button } from '@/components/button';
import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import './my-learning.scss';
import { Card } from '@/features/courses/components/card';

const CourseLearningRoute: React.FC = () => {
  return (
    <div className="landing">
      <Head description={'Welcome to Asakiri'}></Head>
      <NavBar />
      <div className="course-grid-container">
        <div className="course-header">
          <div className="course-heading">Your Courses</div>
          <Button type="secondary" size="small">
            Continue Learning
          </Button>
        </div>
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
              isPublished={true}
            />
          ))}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default CourseLearningRoute;
