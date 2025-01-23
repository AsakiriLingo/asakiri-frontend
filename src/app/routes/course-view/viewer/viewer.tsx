import React from 'react';

import { Button } from '@/components/button';
import { ContentViewCard } from '@/components/content-view';
import { CourseSidebar } from '@/components/course-sidebar';
import { SideBarCard } from '@/components/side-bar-card';
import { CourseViewData } from '@/mocks/course.ts';
import './viewer.scss';

export const Viewer: React.FC = () => {
  return (
    <>
      <div className="header">
        <div className="header__left">
          <Button type="secondary" size="small" onPress={() => {}}>
            Back
          </Button>
          <h1 className="course-viewer__title">Japanese with Misa</h1>
        </div>
      </div>
      <div className="course-viewer">
        <div className="course-viewer__sidebar">
          <CourseSidebar>
            {CourseViewData.map((chapter) => (
              <SideBarCard
                key={chapter.id}
                title={chapter.title}
                subTitle={chapter.subTitle}
                sections={chapter.sections.map((section) => ({
                  id: section.id,
                  title: section.title,
                  subTitle: section.subTitle,
                }))}
              />
            ))}
          </CourseSidebar>
        </div>

        <div className="course-viewer__content">
          <main className="course-viewer__main">
            <div className="course-viewer__container">
              <ContentViewCard
                variant="chapter"
                title="Introduction to Japanese"
                subtitle="Basic Concepts and Greetings"
                content={''}
              />
              <ContentViewCard
                variant="section"
                title="Sentence Building ぶんのつくり"
                subtitle="Understanding Japanese Sentences"
                content={'Test content'}
              />
              <ContentViewCard
                variant="section"
                title="Sentence Building ぶんのつくり"
                subtitle="Understanding Japanese Sentences"
                content={'Test content'}
              />
            </div>
          </main>
        </div>
      </div>
      );
    </>
  );
};

export default Viewer;
