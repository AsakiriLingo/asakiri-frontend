import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { ContentEditCard } from 'src/features/course-creation/components/content-edit-card';

import { Button } from '@/components/button';
import { CourseSidebar } from '@/components/course-sidebar';
import LoadingSpinner from '@/components/loading-spinner/loading-spinner.tsx';
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
  const navigate = useNavigate();
  const {
    getCourseWithChaptersById,
    getSectionsByChapterId,
    createChapter,
    updateChapter,
    createSection,
    updateSection,
    deleteChapter,
    deleteSection,
  } = useCourseCreationAPI();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>();
  const [selectedSection, setSelectedSection] = useState<Section>();
  const [chapterEditEnabled, setChapterEditEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<Course>();
  const [editedSections, setEditedSections] = useState<
    Record<string, Partial<CreateSectionData>>
  >({});

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
  const updateSectionLocally = (
    sectionId: string | 'new',
    updates: Partial<CreateSectionData>
  ) => {
    setEditedSections((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], ...updates },
    }));
  };
  const handleChapterSave = async (data: Partial<CreateChapterData>) => {
    if (!id) return;
    try {
      let response: CourseResponse<Chapter> | undefined;

      if (data.id) {
        response = await updateChapter(data.id, {
          course_id: id,
          title: data.title,
          sub_title: data.sub_title,
          serial_number: data.serial_number || 0,
        });
      } else {
        response = await createChapter({
          course_id: id,
          title: data.title,
          sub_title: data.sub_title,
          serial_number: data.serial_number || 0,
          description: '',
        });
      }

      if (response?.data) {
        const savedChapter = response.data;
        setSelectedChapter(savedChapter);

        const updatedSections = (selectedChapter?.sections ?? []).map(
          (section) => ({
            ...section,
            ...editedSections[section.id ?? 'new'],
          })
        );

        const createdSections = await Promise.all(
          updatedSections
            .filter((section) => !section.id || section.id === 'new') // Only new sections
            .map(async (section, index) => {
              const newSection = await createSection({
                chapter_id: savedChapter.id,
                title: section.title,
                sub_title: section.sub_title,
                serial_number: section.serial_number || index,
                content_html: section.content_html || '',
                content_json: section.content_json || {},
              });

              return newSection.data;
            })
        );

        const allSections = [
          ...updatedSections.filter((s) => s.id && s.id !== 'new'), // Keep existing sections
          ...createdSections.filter(Boolean),
        ]
          .filter((s) => s != null)
          .sort((a, b) => (a.serial_number || 0) - (b.serial_number || 0)); // Sort by serial number

        await Promise.all(
          allSections.map(async (section) => {
            return await updateSection(section.id as string, {
              chapter_id: savedChapter.id,
              title: section.title,
              sub_title: section.sub_title,
              serial_number: section.serial_number || 0,
              content_html: section.content_html || '',
              content_json: section.content_json || {},
            });
          })
        );
        setSelectedChapter({
          ...savedChapter,
          sections: allSections,
        });

        setEditedSections((prev) => {
          const updated = { ...prev };
          delete updated['new'];
          return updated;
        });
        setSelectedSection(undefined);
        setChapterEditEnabled(false);
        await refetchCourse();
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const refetchCourse = async () => {
    if (id) {
      const updatedCourse = await getCourseWithChaptersById(id);
      if (updatedCourse.data) {
        setCourse(updatedCourse.data);
      }
      return updatedCourse;
    }
  };
  const refetchCourseAndUpdateSelectedChapter = async () => {
    if (!selectedChapter) return;
    const updatedCourse = await refetchCourse();
    if (updatedCourse && updatedCourse.data) {
      setSelectedChapter(
        updatedCourse.data.chapters.find((c) => c.id === selectedChapter.id)
      );
    }
  };
  const handleSectionSave = async (data: Partial<CreateSectionData>) => {
    if (!id || !selectedChapter) {
      return;
    }

    try {
      const editedData = editedSections[data.id ?? 'new'] || {};

      const sectionData = {
        chapter_id: selectedChapter.id,
        title: editedData.title ?? data.title,
        sub_title: editedData.sub_title ?? data.sub_title,
        serial_number: editedData.serial_number ?? (data.serial_number || 0),
        content_html: editedData.content_html ?? data.content_html,
        content_json: editedData.content_json ?? data.content_json,
      };

      if (data.id) {
        await updateSection(data.id, sectionData);
      } else {
        await createSection(sectionData);
      }

      await refetchCourseAndUpdateSelectedChapter();

      setEditedSections((prev) => {
        const updated = { ...prev };
        delete updated[data.id ?? 'new'];
        return updated;
      });
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
          <Button type="secondary" size="small" onPress={() => navigate(-1)}>
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
          href={`/course/editor/settings/${id}`}
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
                onClick={() => {
                  if (!selectedChapter || selectedChapter.id !== chapter.id) {
                    setSelectedChapter(chapter);
                  }
                }}
              />
            ))}
            <div className="chapter-add">
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
                  content_html={''}
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
                  onDelete={async () => {
                    if (selectedChapter.id) {
                      await deleteChapter(selectedChapter.id);
                      await refetchCourse();
                      if (chapters.length) {
                        setSelectedChapter(chapters[0]);
                        setChapterEditEnabled(false);
                      }
                    } else {
                      if (selectedChapter) {
                        const updatedChapters = Array.from(chapters).filter(
                          (s) => s != selectedChapter
                        );
                        setSelectedChapter(undefined);
                        setChapters(updatedChapters);
                      }
                    }
                  }}
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
                        isEditable={true}
                        data={section}
                        content_html={section.content_html}
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
                        onDelete={async () => {
                          if (section.id) {
                            await deleteSection(section.id);
                            await refetchCourseAndUpdateSelectedChapter();
                          } else {
                            if (selectedChapter && selectedChapter.sections) {
                              const sections = Array.from(
                                selectedChapter.sections
                              ).filter((s) => s != section);
                              setSelectedChapter({
                                ...selectedChapter,
                                sections,
                              });
                            }
                          }
                        }}
                        updateSectionLocally={updateSectionLocally}
                      />
                    );
                  })}
              {loading && <LoadingSpinner />}
              <div className="course-editor__add-more">
                <Button
                  size="small"
                  type="tertiary"
                  onPress={() => createBlankSection()}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Editor;
