import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { Button } from '@/components/button';
import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import './teach.scss';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation.ts';
import { TeachPageCoursesResponse } from '@/features/course-creation/types/course-card-type.ts';
import { Card } from '@/features/courses/components/card';

const CourseTeachingRoute: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<TeachPageCoursesResponse>();
  const { getTeachCourses } = useCourseCreationAPI();
  useEffect(() => {
    getTeachCourses().then((res) => {
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
          <div className="course-heading"> Published Courses</div>
          <Button
            type="secondary"
            size="small"
            onPress={() => navigate('/course/create')}
          >
            Create New Course
          </Button>
        </div>
        <div className="course-grid">
          {courses.publishedCourses.map((course) => (
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
              link={`/course/editor/${course.id}`}
            />
          ))}
        </div>
      </div>
      <div className="course-grid-container">
        <div className="course-header">
          <div className="course-heading">Draft Courses</div>
        </div>
        <div className="course-grid">
          {courses.draftCourses.map((course) => (
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
              link={`/course/editor/${course.id}`}
            />
          ))}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default CourseTeachingRoute;
