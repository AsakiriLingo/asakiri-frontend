import React from 'react';

import { mockCourseData } from '../../landing/mock-data.ts';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { Button } from '@/components/button';
import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import './teach.scss';
import { Card } from '@/features/courses/components/card';

const CourseTeachingRoute: React.FC = () => {
  return (
    <div className="landing">
      <Head description={'Welcome to Asakiri'}></Head>
      <NavBar />
      <div className="course-grid-container">
        <div className="course-header">
          <div className="course-heading"> Published Courses</div>
          <Button type="secondary" size="small">
            Create New Course
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
      <div className="course-grid-container">
        <div className="course-header">
          <div className="course-heading">Draft Courses</div>
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

export default CourseTeachingRoute;
