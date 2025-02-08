import { Plus, Save, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Button } from '@/components/button';
import { SideBarCard } from '@/components/side-bar-card';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation';
import { ContentEditCard } from '@/features/course-creation/components/content-edit-card';
import { supabase } from '@/lib/supabase/client';
import { Chapter, SideBarCardSection } from '@/types/course-editor.types';
import './course-editor.scss';

const CourseEditor = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const {
    createChapter,
    createSection,
    updateChapter,
    updateSection,
    deleteChapter,
    deleteSection,
  } = useCourseCreationAPI();

  useEffect(() => {
    if (!courseId) return;

    const loadChapters = async () => {
      const { data, error } = await supabase
        .from('chapters')
        .select('*, sections(*)')
        .eq('course_id', courseId)
        .order('serial_number');

      if (!error && data) {
        const formattedChapters: Chapter[] = data.map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          subTitle: chapter.subtitle || '',
          serial_number: chapter.serial_number,
          sections: chapter.sections.map(
            (section: {
              id: never;
              title: never;
              subtitle: never;
              content_html: never;
              serial_number: never;
            }) => ({
              id: section.id,
              title: section.title,
              subTitle: section.subtitle || '',
              content: section.content_html || '',
              serial_number: section.serial_number,
            })
          ),
        }));
        setChapters(formattedChapters);
      }
    };

    loadChapters();

    const subscription = supabase
      .channel('chapter-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chapters',
          filter: `course_id=eq.${courseId}`,
        },
        () => {
          loadChapters();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [courseId]);

  const handleAddChapter = async () => {
    if (!courseId) return;

    const nextSerialNumber =
      chapters.length > 0
        ? Math.max(...chapters.map((ch) => ch.serial_number)) + 1
        : 0;

    await createChapter({
      title: 'New Chapter',
      subtitle: 'Chapter Description',
      course_id: courseId,
      serial_number: nextSerialNumber,
    });
  };

  const handleAddSection = async (chapterId: string) => {
    const chapter = chapters.find((ch) => ch.id === chapterId);
    if (!chapter) return;

    const nextSerialNumber =
      chapter.sections.length > 0
        ? Math.max(...chapter.sections.map((s) => s.serial_number)) + 1
        : 0;

    await createSection({
      title: 'New Section',
      subtitle: 'Section Description',
      content_html: '',
      chapter_id: chapterId,
      serial_number: nextSerialNumber,
    });
  };

  const handleSaveChapter = async (
    chapterId: string,
    data: { title: string; subTitle: string }
  ) => {
    await updateChapter(chapterId, {
      title: data.title,
      subtitle: data.subTitle,
    });
  };

  const handleSaveSection = async (
    sectionId: string,
    data: { title: string; subTitle: string; content?: string }
  ) => {
    if (!selectedChapter) return;

    await updateSection(sectionId, {
      title: data.title,
      subtitle: data.subTitle,
      content_html: data.content,
    });
  };

  const handleDeleteChapter = async (chapterId: string) => {
    await deleteChapter(chapterId);
    setSelectedChapter(null);
  };

  const handleDeleteSection = async (sectionId: string) => {
    await deleteSection(sectionId);
  };

  const mapToSideBarSection = (
    section: Chapter['sections'][0]
  ): SideBarCardSection => ({
    id: section.id,
    title: section.title,
    subTitle: section.subTitle,
  });

  return (
    <div className="course-editor">
      <div className="course-editor__header">
        <div className="course-editor__actions">
          <Button size="small" onPress={() => {}}>
            <Save className="w-4 h-4" />
            Save
          </Button>
          <Button
            size="small"
            onPress={() => navigate(`/course/editor/settings/${courseId}`)}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="course-editor__sidebar">
        {chapters.map((chapter) => (
          <SideBarCard
            key={chapter.id}
            title={chapter.title}
            subTitle={chapter.subTitle}
            sections={chapter.sections.map(mapToSideBarSection)}
            isDeletable={true}
            onSelect={() => setSelectedChapter(chapter)}
          />
        ))}
        <Button size="small" onPress={handleAddChapter}>
          <Plus className="w-4 h-4" />
          Add Chapter
        </Button>
      </div>

      <div className="course-editor__content">
        {selectedChapter && (
          <div className="course-editor__main">
            <ContentEditCard
              variant="chapter"
              title={selectedChapter.title}
              subTitle={selectedChapter.subTitle}
              content=""
              isEditable={true}
              onSave={async (data) =>
                handleSaveChapter(selectedChapter.id, data)
              }
              onDelete={async () => handleDeleteChapter(selectedChapter.id)}
            />

            {selectedChapter.sections.map((section) => (
              <ContentEditCard
                key={section.id}
                variant="section"
                title={section.title}
                subTitle={section.subTitle}
                content={section.content}
                isEditable={true}
                onSave={async (data) => handleSaveSection(section.id, data)}
                onDelete={async () => handleDeleteSection(section.id)}
              />
            ))}

            <Button
              size="small"
              onPress={() => handleAddSection(selectedChapter.id)}
            >
              <Plus className="w-4 h-4" />
              Add Section
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseEditor;
