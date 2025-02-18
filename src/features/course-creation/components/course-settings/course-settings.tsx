import React, { useEffect, useState } from 'react';
import { FileTrigger } from 'react-aria-components';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/button';
import { DialogTrigger } from '@/components/dialog-trigger';
import { Image } from '@/components/image';
import { Modal } from '@/components/modal';
import { SimpleTextEditor } from '@/components/simple-text-editor';
import { TextField } from '@/components/text-field';
import { toast } from '@/components/toast';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation.ts';
import { LanguageList } from '@/features/course-creation/components/language-list';
import { Course } from '@/types/course.types.ts';
import { Language } from '@/types/language.types.ts';

import './course-settings.scss';

export interface CourseSettingsProps {
  course: Course | undefined;
  setCourse: React.Dispatch<React.SetStateAction<Course | undefined>>;
}
export const CourseSettings: React.FC<CourseSettingsProps> = ({
  course,
  setCourse,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const { getCourseById, updateCourse, getLanguageById } =
    useCourseCreationAPI();
  const [isLanguageTaughtOpen, setIsLanguageTaughtOpen] = useState(false);
  const [isCourseLanguageOpen, setIsCourseLanguageOpen] = useState(false);
  const [selectedLanguageThought, setSelectedLanguageThought] =
    useState<Language>();
  const [selectedCourseLanguage, setSelectedCourseLanguage] =
    useState<Language>();

  useEffect(() => {
    if (id) {
      refetchCourse();
    }
  }, [id]);
  const refetchCourse = async () => {
    if (id) {
      const res = await getCourseById(id);
      if (res.data) {
        setCourse(res.data);
        if (res.data.thumbnail) setThumbnail(res.data.thumbnail);
        if (res.data.language_taught || res.data.course_language)
          setLanguages(res.data);
      }
    }
  };
  const setLanguages = async (data: Course) => {
    if (data.course_language) {
      const res = await getLanguageById(data.course_language);
      if (res.error) {
        console.error('Error fetching languages:', res.error);
        setSelectedCourseLanguage(undefined);
      } else {
        setSelectedCourseLanguage(res.data!);
      }
    }
    if (data.language_taught) {
      const res = await getLanguageById(data.language_taught);
      if (res.error) {
        console.error('Error fetching languages:', res.error);
        setSelectedLanguageThought(undefined);
      } else {
        setSelectedLanguageThought(res.data!);
      }
    }
  };
  const handleThumbnailSelect = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateField = <K extends keyof Course>(field: K, value: Course[K]) => {
    setCourse((prevCourse) => ({
      ...prevCourse!,
      [field]: value,
    }));
  };

  const onLanguageTaughtSelect = (language: Language) => {
    updateField('language_taught', language.id);
    setSelectedLanguageThought(language);
    setIsLanguageTaughtOpen(false);
  };

  const onCourseLanguageSelect = (language: Language) => {
    updateField('course_language', language.id);
    setSelectedCourseLanguage(language);
    setIsCourseLanguageOpen(false);
  };

  const handleSaveCourse = async (publish: boolean) => {
    if (!id || !course) return;

    const courseUpdate: Partial<Course> = {
      title: course.title,
      short_description: course.short_description,
      description_html: course.description_html,
      description_json: course.description_json,
      course_language: course.course_language,
      language_taught: course.language_taught,
      support_link: course.support_link,
    };

    if (publish) {
      courseUpdate.is_published = true;
      courseUpdate.published_at = new Date();
    }

    const response = await updateCourse(id, courseUpdate, thumbnailFile);

    if (response.error) {
      toast.error(`Failed to update course: ${response.error.message}`);
    } else {
      toast.success('Course updated successfully');
      navigate('/teach');
    }
  };
  const handleUnPublishCourse = async () => {
    if (!id || !course) return;
    const courseUpdate: Partial<Course> = {
      is_published: false,
    };
    const response = await updateCourse(id, courseUpdate);
    if (response.error) {
      toast.error(`Failed to update course: ${response.error.message}`);
    } else {
      toast.success('Course updated successfully');
      await refetchCourse();
    }
  };
  if (!course) {
    return <div />;
  }

  return (
    <>
      <header className="course-settings__heading">
        <h2 className="course-settings__title">Course Settings</h2>
        <div className="actions">
          <Button
            type="primary"
            size="small"
            onPress={() => handleSaveCourse(false)}
          >
            Save
          </Button>
          {!course.is_published && (
            <Button
              type="secondary"
              size="small"
              onPress={() => handleSaveCourse(true)}
            >
              Publish Course
            </Button>
          )}
          {course.is_published && (
            <Button
              type="secondary"
              size="small"
              onPress={() => handleUnPublishCourse()}
            >
              Unpublish Course
            </Button>
          )}
        </div>
      </header>
      <div className="settings-container">
        <TextField
          label="Course Name"
          text={course.title}
          onChange={(e) => updateField('title', e.target.value)}
        />
        <TextField
          label="Course Short Description"
          text={course.short_description}
          onChange={(e) => updateField('short_description', e.target.value)}
        />
        <TextField
          label="Support Link (Patreon, Kofi etc)"
          text={course.support_link}
          onChange={(e) => updateField('support_link', e.target.value)}
        />
        <SimpleTextEditor
          content_html={course.description_html}
          content_json={{}}
          onEditorChange={(e) => {
            updateField('description_html', e.html);
            updateField('description_json', e.json);
          }}
          placeholder="Write your course description..."
        />

        <div className="section-container">
          <div className="label-bold">Course Thumbnail</div>
          <div className="thumbnail-section">
            <div className="thumbnail-preview">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="Course thumbnail preview"
                  className="thumbnail-image"
                />
              ) : (
                <div className="thumbnail-placeholder">
                  <Image
                    src=""
                    width="400px"
                    height="225px"
                    alt="Upload thumbnail"
                  />
                </div>
              )}
            </div>
            <FileTrigger
              onSelect={handleThumbnailSelect}
              acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
            >
              <Button size="small" variant="flat">
                {thumbnail ? 'Change Thumbnail' : 'Upload Thumbnail'}
              </Button>
            </FileTrigger>
          </div>
        </div>

        <div className="section-container">
          <div className="label-bold">Language Taught</div>
          <div>
            <DialogTrigger>
              <Button
                size="small"
                variant="flat"
                onPress={() => setIsLanguageTaughtOpen(true)}
              >
                {selectedLanguageThought?.name_en ?? 'Select Language Taught'}
              </Button>
              <Modal
                isOpen={isLanguageTaughtOpen}
                setIsOpen={setIsLanguageTaughtOpen}
              >
                <LanguageList
                  heading="Language Taught"
                  onSelect={onLanguageTaughtSelect}
                />
              </Modal>
            </DialogTrigger>
          </div>
        </div>

        <div className="section-container">
          <div className="label-bold">Course Language</div>
          <div>
            <DialogTrigger>
              <Button
                size="small"
                variant="flat"
                onPress={() => setIsCourseLanguageOpen(true)}
              >
                {selectedCourseLanguage?.name_en ?? 'Select Course Language'}
              </Button>
              <Modal
                isOpen={isCourseLanguageOpen}
                setIsOpen={setIsCourseLanguageOpen}
              >
                <LanguageList
                  heading="Course Language"
                  onSelect={onCourseLanguageSelect}
                />
              </Modal>
            </DialogTrigger>
          </div>
        </div>
      </div>
    </>
  );
};
