import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/button';
import { Head } from '@/components/seo';
import { CourseSettings } from '@/features/course-creation/components/course-settings';
import { Course } from '@/types/course.types.ts';
import './settings.scss';

const CourseSettingsRoute: React.FC = () => {
  const [course, setCourse] = useState<Course>();
  const navigate = useNavigate();

  return (
    <>
      <Head
        title={course?.title}
        description={course?.short_description}
      ></Head>
      <div className="settings-header">
        <div className="settings-header__left">
          <Button type="secondary" size="small" onPress={() => navigate(-1)}>
            Back
          </Button>
          <h1 className="course-settings__title">{course?.title || ''}</h1>
        </div>
      </div>
      <div className="course-settings">
        <CourseSettings course={course} setCourse={setCourse} />
      </div>
    </>
  );
};
export default CourseSettingsRoute;
