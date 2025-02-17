import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ContentEditCard } from 'src/features/course-creation/components/content-edit-card';

import { Button } from '@/components/button';
import { CourseSidebar } from '@/components/course-sidebar';
import { SideBarCard } from '@/components/side-bar-card';
import { toast } from '@/components/toast';
import {
  CourseResponse,
  useCourseCreationAPI,
} from '@/features/course-creation/api/course-creation.ts';
import {
  CreateChapterData,
  CreateSectionData,
} from '@/features/course-creation/types';
import { Chapter } from '@/types/chapter.types.ts';
import { Course } from '@/types/course.types.ts';
import { Section } from '@/types/section.types.ts';

import './editor.scss';

export const Editor: React.FC = () => {
  const { id } = useParams();
  const {
    getCourseById,
    createChapter,
    updateChapter,
    createSection,
    updateSection,
  } = useCourseCreationAPI();
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
          if (res.data.chapters.length) {
            setSelectedChapter(res.data.chapters[0]);
          }
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
      sections: [],
      serial_number: chapters.length,
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
      serial_number: sections.length,
    };
    setSelectedChapter({
      ...selectedChapter!,
      sections: [...sections, section],
    });
  };
  const handleChapterSave = async (data: Partial<CreateChapterData>) => {
    if (!id) {
      return;
    }
    try {
      let response: CourseResponse<Chapter> | undefined;
      if (data.id) {
        response = await updateChapter(data.id, {
          courseId: id,
          title: data.title,
          sub_title: data.sub_title,
          serialNumber: data.serialNumber || 0,
        });
      } else {
        response = await createChapter({
          courseId: id,
          title: data.title,
          sub_title: data.sub_title,
          serialNumber: data.serialNumber || 0,
          description: '',
        });
      }
      if (response.data) {
        setSelectedChapter(response.data);
      }
      const updatedCourse = await getCourseById(id);
      if (updatedCourse.data) {
        setCourse(updatedCourse.data);
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error('Something went wrong');
      }
    }
  };
  const handleSectionSave = async (data: Partial<CreateSectionData>) => {
    if (!id || !selectedChapter) {
      return;
    }
    try {
      if (data.id) {
        await updateSection(data.id, {
          chapterId: selectedChapter.id,
          title: data.title,
          sub_title: data.sub_title,
          serialNumber: data.serialNumber || 0,
          contentHtml: data.contentHtml,
          contentJson: data.contentJson,
        });
      } else {
        await createSection({
          chapterId: selectedChapter.id,
          title: data.title,
          sub_title: data.sub_title,
          serialNumber: data.serialNumber || 0,
          contentHtml: data.contentHtml,
          contentJson: data.contentJson,
        });
      }
      const updatedCourse = await getCourseById(id);
      if (updatedCourse.data) {
        setCourse(updatedCourse.data);
        setSelectedChapter(
          updatedCourse.data.chapters.find((c) => c.id === selectedChapter.id)
        );
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error('Something went wrong');
      }
    }
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
                  key={'chapter' + selectedChapter.title + selectedChapter.id}
                  variant="chapter"
                  title={selectedChapter.title}
                  sub_title={selectedChapter.sub_title}
                  isEditable={true}
                  data={selectedChapter}
                  editEnabled={chapterEditEnabled}
                  contentHtml={''}
                  onEditClicked={() => setChapterEditEnabled(true)}
                  onSave={async (data) => {
                    if (id) {
                      const chapterData: Partial<CreateChapterData> = {
                        ...selectedChapter,
                        ...data,
                      };
                      await handleChapterSave(chapterData);
                    }
                  }}
                />
              )}
              {selectedChapter &&
                selectedChapter.sections.map((section) => {
                  return (
                    <ContentEditCard
                      key={'section' + section.title + section.id}
                      variant="section"
                      title={section.title}
                      sub_title={section.sub_title}
                      isEditable={true}
                      data={section}
                      contentHtml={section.content_html}
                      editEnabled={section.id === selectedSection?.id}
                      onEditClicked={() => {
                        setSelectedSection(section);
                      }}
                      onSave={async (data) => {
                        if (selectedChapter.id) {
                          await handleSectionSave(data);
                        }
                        setSelectedSection(undefined);
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
