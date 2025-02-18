import React, { useEffect, useState } from 'react';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { Footer } from '@/components/footer';
import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation.ts';
import { HomepageCoursesResponse } from '@/features/course-creation/types/course-card-type.ts';
import { Card } from '@/features/courses/components/card';

import './landing.scss';

const LandingRoute: React.FC = () => {
  const [courses, setCourses] = useState<HomepageCoursesResponse>();
  const { getHomepageCourses } = useCourseCreationAPI();
  useEffect(() => {
    getHomepageCourses().then((res) => {
      if (res) {
        console.log(res);
        setCourses(res);
      }
    });
  }, []);
  if (!courses) return <div />;
  return (
    <div className="landing">
      <Head description={'Welcome to Asakiri'}></Head>
      <NavBar />
      <div className="course-grid-container">
        <div className="course-header">
          <div className="course-heading"> Popular Courses</div>
        </div>
        <div className="course-grid">
          {courses.popularCourses.map((course) => (
            <Card
              key={course.id}
              title={course.title}
              short_description={course.short_description}
              course_language={course.course_language}
              language_taught={course.language_taught}
              thumbnail={course.thumbnail}
              id={course.id}
              author_id={course.author_id}
              author_name={course.author_name}
              author_subtitle={course.author_subtitle}
              author_avatar_url={course.author_avatar_url}
              enrolled_students={course.enrolled_students}
              created_at={course.author_id}
              category={''}
            />
          ))}
        </div>
      </div>
      <div className="course-grid-container">
        <div className="course-header">
          <div className="course-heading">Trending Courses</div>
        </div>
        <div className="course-grid">
          {courses.trendingCourses.map((course) => (
            <Card
              key={course.id}
              title={course.title}
              short_description={course.short_description}
              course_language={course.course_language}
              language_taught={course.language_taught}
              thumbnail={course.thumbnail}
              id={course.id}
              author_id={course.author_id}
              author_name={course.author_name}
              author_subtitle={course.author_subtitle}
              author_avatar_url={course.author_avatar_url}
              enrolled_students={course.enrolled_students}
              created_at={course.author_id}
              category={''}
            />
          ))}
        </div>
      </div>
      <div className="course-grid-container">
        <div className="course-header">
          <div className="course-heading">Recent Courses</div>
        </div>
        <div className="course-grid">
          {courses.recentCourses.map((course) => (
            <Card
              key={course.id}
              title={course.title}
              short_description={course.short_description}
              course_language={course.course_language}
              language_taught={course.language_taught}
              thumbnail={course.thumbnail}
              id={course.id}
              author_id={course.author_id}
              author_name={course.author_name}
              author_subtitle={course.author_subtitle}
              author_avatar_url={course.author_avatar_url}
              enrolled_students={course.enrolled_students}
              created_at={course.author_id}
              category={''}
            />
          ))}
        </div>
      </div>
      <BottomNavBar />
      <Footer />
    </div>
  );
};

export default LandingRoute;
