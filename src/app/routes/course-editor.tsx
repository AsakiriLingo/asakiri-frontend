import { Plus } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/button';
import { ContentCard } from '@/components/content-card';
import { CourseSidebar } from '@/components/course-sidebar';
import { SideBarCard } from '@/components/side-bar-card';
import { Editor } from '@/features/course-creation/components/editor';
import { CourseViewData } from '@/mocks/course';
import './course-editor.scss';

export const CourseEditor: React.FC = () => {
  return (
    <>
      <div className="header">
        <div className="header__left">
          <Button type="secondary" size="small" onPress={() => {}}>
            Back
          </Button>
          <h1 className="course-editor__title">Foundations of Japanese</h1>
        </div>

        <Button variant="filled" type="primary" size="small" onPress={() => {}}>
          Settings
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
              <ContentCard
                variant="chapter"
                title="Introduction to Japanese"
                subtitle="Basic Concepts and Greetings"
                onTitleChange={(newTitle) =>
                  console.log('New title:', newTitle)
                }
                onSubtitleChange={(newSubtitle) =>
                  console.log('New subtitle:', newSubtitle)
                }
              />
              <ContentCard
                variant="section"
                title="Sentence Building ぶんのつくり"
                subtitle="Understanding Japanese Sentences"
                onTitleChange={(newTitle) =>
                  console.log('New title:', newTitle)
                }
                onSubtitleChange={(newSubtitle) =>
                  console.log('New subtitle:', newSubtitle)
                }
              >
                <Editor content="" />
              </ContentCard>
              <ContentCard
                variant="section"
                title="Sentence Building ぶんのつくり"
                subtitle="Understanding Japanese Sentences"
                onTitleChange={(newTitle) =>
                  console.log('New title:', newTitle)
                }
                onSubtitleChange={(newSubtitle) =>
                  console.log('New subtitle:', newSubtitle)
                }
              >
                <Editor content="" />
              </ContentCard>
              <div>
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

export default CourseEditor;
