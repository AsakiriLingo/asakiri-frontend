import React, { useEffect, useState } from 'react';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import './my-learning.scss';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation.ts';
import { CourseCard } from '@/features/course-creation/types/course-card-type.ts';
import { Card } from '@/features/courses/components/card';

const CourseLearningRoute: React.FC = () => {
  const [courses, setCourses] = useState<CourseCard[]>([]);
  const { getMyLearningCourses } = useCourseCreationAPI();
  useEffect(() => {
    getMyLearningCourses().then((res) => {
      if (res) {
        setCourses(res);
      }
    });
  }, []);
  return (
    <div className="landing">
      <Head description={'Welcome to Asakiri'}></Head>
      <NavBar />
      <div className="course-grid-container">
        <div className="course-header">
          <div className="course-heading">Your Courses</div>
        </div>
        <div className="course-grid">
          {courses.map((course) => (
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
              showTotalEnrolled={true}
              created_at={course.author_id}
              category={''}
              link={`/course/viewer/${course.id}`}
            />
          ))}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default CourseLearningRoute;
