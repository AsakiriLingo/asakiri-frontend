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
  const [searchResults, setSearchResults] = useState<CourseCard[]>([]);
  const { getHomepageCourses, getAllPublishedCourses } = useCourseCreationAPI();
  useEffect(() => {
    getHomepageCourses().then((res) => {
      if (res) {
        setCourses(res);
      }
    });
  }, []);
  useEffect(() => {
    getAllPublishedCourses(searchTerm).then((res) => {
      if (res) {
        setSearchResults(res);
      }
    });
  }, [searchTerm]);

  if (!courses) return <div />;

  return (
    <div className="landing">
      <Head description={'Welcome to Asakiri'}></Head>
      <NavBar
        showSearch={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {searchTerm ? (
        <div className="course-grid-container">
          <div className="course-header">
            <div className="course-heading">Search Results</div>
          </div>
          <div className="course-grid">
            {searchResults.length > 0 ? (
              searchResults.map((course) => (
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
                  created_at={course.created_at}
                  category=""
                  showTotalEnrolled={true}
                />
              ))
            ) : (
              <p>No courses found.</p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="course-grid-container">
            <div className="course-header">
              <div className="course-heading">Popular Courses</div>
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
                  created_at={course.created_at}
                  category=""
                  showTotalEnrolled={true}
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
                  created_at={course.created_at}
                  category=""
                  showTotalEnrolled={true}
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
                  created_at={course.created_at}
                  category=""
                  showTotalEnrolled={true}
                />
              ))}
            </div>
          </div>
        </>
      )}

      <BottomNavBar />
      <Footer />
    </div>
  );
};

export default LandingRoute;
