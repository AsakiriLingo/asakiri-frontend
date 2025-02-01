import { Plus } from 'lucide-react';
import React from 'react';
import { ContentEditCard } from 'src/features/course-creation/components/content-edit-card';

import { Button } from '@/components/button';
import { CourseSidebar } from '@/components/course-sidebar';
import { SideBarCard } from '@/components/side-bar-card';
import { CourseViewData } from '@/mocks/course.ts';
import './editor.scss';

export const Editor: React.FC = () => {
  return (
    <>
      <div className="header">
        <div className="header__left">
          <Button type="secondary" size="small" onPress={() => {}}>
            Back
          </Button>
          <h1 className="course-editor__title">Course Settings</h1>
        </div>

        <Button
          variant="filled"
          type="primary"
          size="small"
          onPress={() => {}}
          isLink={true}
          href="./course-settings"
        >
          Course Settings
        </Button>
      </div>
      <div className="course-editor">
        <div className="course-editor__sidebar">
          <CourseSidebar>
            {CourseViewData.map((chapter) => (
              <SideBarCard
                key={chapter.id}
                title={chapter.title}
                subTitle={chapter.subTitle}
                isDeletable={true}
                sections={chapter.sections.map((section) => ({
                  id: section.id,
                  title: section.title,
                  subTitle: section.subTitle,
                }))}
              />
            ))}
            <div>
              <Button size="small" onPress={() => {}}>
                <Plus />
              </Button>
            </div>
          </CourseSidebar>
        </div>

        <div className="course-editor__content">
          <main className="course-editor__main">
            <div className="course-editor__container">
              <ContentEditCard
                variant="chapter"
                title="Introduction to Japanese"
                subtitle="Basic Concepts and Greetings"
                isEditable={true}
                content={''}
              />
              <ContentEditCard
                variant="section"
                title="Sentence Building ぶんのつくり"
                subtitle="Understanding Japanese Sentences"
                isEditable={true}
                content={'Test content'}
              />
              <ContentEditCard
                variant="section"
                title="Sentence Building ぶんのつくり"
                subtitle="Understanding Japanese Sentences"
                isEditable={true}
                content={'Test content'}
              />
              <div className="course-editor__add-more">
                <Button size="small" onPress={() => {}}>
                  <Plus />
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
      );
    </>
  );
};

export default Editor;
