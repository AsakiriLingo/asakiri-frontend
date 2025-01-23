import React from 'react';

import { Button } from '@/components/button';
import { Head } from '@/components/seo';
import './creator.scss';
import { CourseCreator } from '@/features/course-creation/components/course-creator';

const CourseSettingsRoute: React.FC = () => {
  return (
    <>
      <Head description={'Course Creator'}></Head>
      <div className="creator-header">
        <div className="creator-header__left">
          <Button type="secondary" size="small" onPress={() => {}}>
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
export default CourseSettingsRoute;
