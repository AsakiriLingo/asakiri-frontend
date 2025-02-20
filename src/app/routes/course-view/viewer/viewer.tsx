import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/button';
import { CourseSidebar } from '@/components/course-sidebar';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner.tsx';
import { SideBarCard } from '@/components/side-bar-card';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation.ts';
import { ContentEditCard } from '@/features/course-creation/components/content-edit-card';
import { Chapter } from '@/types/chapter.types.ts';
import { Course } from '@/types/course.types.ts';

import './viewer.scss';

export const Viewer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseWithChaptersById, getSectionsByChapterId } =
    useCourseCreationAPI();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>();
  const [course, setCourse] = useState<Course>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCourseWithChaptersById(id)
        .then((res) => {
          if (res.data) {
            setCourse(res.data);
            if (res.data.chapters.length) {
              setSelectedChapter(res.data.chapters[0]);
            }
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);
  useEffect(() => {
    if (course && course.chapters) {
      setChapters(course.chapters);
    }
  }, [course]);
  useEffect(() => {
    if (selectedChapter && selectedChapter.id) {
      setLoading(true);
      getSectionsByChapterId(selectedChapter.id)
        .then((res) => {
          if (res.data) {
            setSelectedChapter({ ...selectedChapter, sections: res.data });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [selectedChapter?.id]);
  return (
    <>
      <div className="header">
        <div className="header__left">
          <Button type="secondary" size="small" onPress={() => navigate(-1)}>
            Back
          </Button>
          <h1 className="course-editor__title">{course?.title}</h1>
        </div>
        {course?.support_link && (
          <Button
            variant="filled"
            type="primary"
            size="small"
            onPress={() => {}}
            isLink={true}
            href={course?.support_link}
            target="_blank"
          >
            Support
          </Button>
        )}
      </div>
      <div className="course-editor">
        <div className="course-editor__sidebar">
          <CourseSidebar>
            {chapters?.map((chapter) => (
              <SideBarCard
                key={chapter.id}
                title={chapter.title}
                subTitle={chapter.sub_title}
                selected={selectedChapter && selectedChapter.id === chapter.id}
                onClick={() => {
                  if (!selectedChapter || selectedChapter.id !== chapter.id) {
                    setSelectedChapter(chapter);
                  }
                }}
              />
            ))}
          </CourseSidebar>
        </div>

        <div className="course-editor__content">
          <main className="course-editor__main">
            <div className="course-editor__container">
              {selectedChapter && (
                <ContentEditCard
                  key={'chapter' + selectedChapter.title + selectedChapter.id}
                  variant="chapter"
                  title={selectedChapter.title}
                  sub_title={selectedChapter.sub_title}
                  isEditable={false}
                  data={selectedChapter}
                  editEnabled={false}
                  content_html={''}
                />
              )}
              {selectedChapter &&
                (selectedChapter.sections ?? [])
                  .sort(
                    (a, b) => (a.serial_number || 0) - (b.serial_number || 0)
                  )
                  .map((section) => {
                    return (
                      <ContentEditCard
                        key={'section' + section.title + section.id}
                        variant="section"
                        title={section.title}
                        sub_title={section.sub_title}
                        isEditable={false}
                        data={section}
                        content_html={section.content_html}
                        editEnabled={false}
                      />
                    );
                  })}
              {loading && <LoadingSpinner />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default Viewer;
