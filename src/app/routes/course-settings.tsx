import React from 'react';

import { Button } from '@/components/button';
import { Head } from '@/components/seo';
import './course-settings.scss';
import { CourseSettings } from '@/features/course-creation/components/course-settings';

const CourseSettingsRoute: React.FC = () => {
  return (
    <>
      <Head description={'Course Settings'}></Head>
      <div className="settings-header">
        <div className="settings-header__left">
          <Button type="secondary" size="small" onPress={() => {}}>
            Back
          </Button>
          <h1 className="course-settings__title">Foundations of Japanese</h1>
        </div>
      </div>
      <div className="course-settings">
        <CourseSettings />
      </div>
    </>
  );
};
export default CourseSettingsRoute;
