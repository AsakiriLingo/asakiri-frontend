import React, { useEffect, useState } from 'react';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { Footer } from '@/components/footer';
import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation.ts';
import {
  CourseCard,
  HomepageCoursesResponse,
} from '@/features/course-creation/types/course-card-type.ts';
import { Card } from '@/features/courses/components/card';

import './landing.scss';

const LandingRoute: React.FC = () => {
  const [courses, setCourses] = useState<HomepageCoursesResponse>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { getHomepageCourses } = useCourseCreationAPI();
  useEffect(() => {
    getHomepageCourses().then((res) => {
      if (res) {
        setCourses(res);
      }
    });
  }, []);
  const filterCourses = (courseArray: CourseCard[]) => {
    if (!searchTerm.trim()) return courseArray; // Return all if search is empty

    const lowerSearchTerm = searchTerm.toLowerCase();
    return courseArray.filter((course) =>
      [
        course.language_taught,
        course.author_name,
        course.short_description,
        course.title,
      ].some((field) => field.toLowerCase().includes(lowerSearchTerm))
    );
  };

  if (!courses) return <div />;
  const filteredPopularCourses = filterCourses(courses.popularCourses);
  const filteredTrendingCourses = filterCourses(courses.trendingCourses);
  const filteredRecentCourses = filterCourses(courses.recentCourses);
  return (
    <div className="landing">
      <Head description={'Welcome to Asakiri'}></Head>
      <NavBar
        showSearch={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="course-grid-container">
        <div className="course-header">
          <div className="course-heading"> Popular Courses</div>
        </div>
        <div className="course-grid">
          {filteredPopularCourses.map((course) => (
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
          {filteredTrendingCourses.map((course) => (
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
          {filteredRecentCourses.map((course) => (
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
