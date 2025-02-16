import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ContentEditCard } from 'src/features/course-creation/components/content-edit-card';

import { Button } from '@/components/button';
import { CourseSidebar } from '@/components/course-sidebar';
import { SideBarCard } from '@/components/side-bar-card';
import { toast } from '@/components/toast';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation.ts';
import { Chapter } from '@/types/chapter.types.ts';
import { Course } from '@/types/course.types.ts';
import { Section } from '@/types/section.types.ts';

import './editor.scss';

export const Editor: React.FC = () => {
  const { id } = useParams();
  const { getCourseById, createChapter, updateChapter } =
    useCourseCreationAPI();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>();
  const [selectedSection, setSelectedSection] = useState<Section>();
  const [chapterEditEnabled, setChapterEditEnabled] = useState<boolean>(false);
  const [course, setCourse] = useState<Course>();
  useEffect(() => {
    if (id) {
      getCourseById(id).then((res) => {
        if (res.data) {
          setCourse(res.data);
        }
      });
    }
  }, [id]);
  useEffect(() => {
    if (course && course.chapters) {
      setChapters(course.chapters);
    }
  }, [course]);
  const createBlankChapter = () => {
    if (chapters.find((c) => !c.id)) {
      toast.success('Please save draft chapter first!');
      return;
    }
    const dummyChapter = {
      title: `Chapter ${chapters.length + 1}`,
      sub_title: `Subtitle of chapter ${chapters.length + 1}`,
      sections: [
        {
          content_html: '',
          title: `Section Title 1`,
          sub_title: `Section Subtitle 1`,
          content_json: {},
          serial_number: 0,
        },
      ],
      serial_number: chapters.length + 1,
    };
    setChapters([...chapters, dummyChapter]);
    setTimeout(() => {
      setSelectedChapter(dummyChapter);
      setChapterEditEnabled(true);
    }, 200);
  };
  const createBlankSection = () => {
    if (!selectedChapter && !chapters.length) {
      createBlankChapter();
      return;
    }
    const sections = Array.from(selectedChapter?.sections || []);
    if (sections.find((c) => !c.id)) {
      toast.success('Please save draft section first!');
      return;
    }
    const section: Section = {
      content_html: '',
      title: `Section Title ${sections.length + 1}`,
      sub_title: `Section Subtitle ${sections.length + 1}`,
      content_json: {},
      serial_number: sections.length + 1,
    };
    setSelectedChapter({
      ...selectedChapter!,
      sections: [...sections, section],
    });
  };
  return (
    <>
      <div className="header">
        <div className="header__left">
          <Button type="secondary" size="small" onPress={() => {}}>
            Back
          </Button>
          <h1 className="course-editor__title">{course?.title}</h1>
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
            {chapters?.map((chapter) => (
              <SideBarCard
                key={chapter.id}
                title={chapter.title}
                subTitle={chapter.sub_title}
                selected={selectedChapter && selectedChapter.id === chapter.id}
                onClick={() => setSelectedChapter(chapter)}
              />
            ))}
            <div>
              <Button size="small" onPress={() => createBlankChapter()}>
                <Plus />
              </Button>
            </div>
          </CourseSidebar>
        </div>

        <div className="course-editor__content">
          <main className="course-editor__main">
            <div className="course-editor__container">
              {selectedChapter && (
                <ContentEditCard
                  variant="chapter"
                  title={selectedChapter.title}
                  subtitle={selectedChapter.sub_title}
                  isEditable={true}
                  data={selectedChapter}
                  editEnabled={chapterEditEnabled}
                  contentHtml={''}
                  onEditClicked={() => setChapterEditEnabled(true)}
                  onSave={async (data) => {
                    if (id) {
                      if (selectedChapter.id) {
                        const response = await updateChapter(
                          selectedChapter.id,
                          {
                            courseId: id,
                            title: data.title,
                            subTitle: data.subtitle,
                            serialNumber: selectedChapter.serial_number || 0,
                          }
                        );
                        if (response.data) {
                          setSelectedChapter(response.data);
                        }
                      } else {
                        const response = await createChapter({
                          courseId: id,
                          title: data.title,
                          subTitle: data.subtitle,
                          serialNumber: selectedChapter.serial_number || 0,
                          description: '',
                        });
                        if (response.data) {
                          setSelectedChapter(response.data);
                        }
                      }
                      const updatedCourse = await getCourseById(id);
                      if (updatedCourse.data) {
                        setCourse(updatedCourse.data);
                      }
                    }
                  }}
                />
              )}
              {selectedChapter &&
                selectedChapter.sections.map((section) => {
                  return (
                    <ContentEditCard
                      variant="section"
                      title={section.title}
                      subtitle={section.sub_title}
                      isEditable={true}
                      data={section}
                      contentHtml={section.content_html}
                      editEnabled={section.id === selectedSection?.id}
                      onEditClicked={() => {
                        setSelectedSection(section);
                      }}
                      onSave={async (data) => {
                        console.log(data);
                      }}
                    />
                  );
                })}
              <div className="course-editor__add-more">
                <Button size="small" onPress={() => createBlankSection()}>
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
