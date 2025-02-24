import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/button';
import { Seo } from '@/components/seo';
import { CourseCreator } from '@/features/course-creation/components/course-creator';

import './creator.scss';

const CourseCreatorRoute: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Seo description={'Course Creator'}></Seo>
      <div className="creator-header">
        <div className="creator-header__left">
          <Button type="secondary" size="small" onPress={() => navigate(-1)}>
            Back
          </Button>
          <h1 className="course-creator__title">Create Course</h1>
        </div>
      </div>
      <div className="course-creator">
        <CourseCreator />
      </div>
    </>
  );
};
export default CourseCreatorRoute;
