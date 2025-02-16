import React, { useState } from 'react';
import { FileTrigger } from 'react-aria-components';

import { Button } from '@/components/button';
import { DialogTrigger } from '@/components/dialog-trigger';
import { Image } from '@/components/image';
import { Modal } from '@/components/modal';
import { SimpleTextEditor } from '@/components/simple-text-editor';
import { TextField } from '@/components/text-field';
import { LanguageList } from '@/features/course-creation/components/language-list';

import './course-settings.scss';

export const CourseSettings: React.FC = () => {
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const handleThumbnailSelect = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <header className="course-settings__heading">
        <h2 className="course-settings__title">Course Settings</h2>
        <div className="actions">
          <Button type="primary" size="small" onPress={() => {}}>
            Save
          </Button>
          <Button type="secondary" size="small" onPress={() => {}}>
            Publish Course
          </Button>
        </div>
      </header>
      <div className="settings-container">
        <TextField label="Course Name" />
        <TextField label="Course Short Description" />
        <TextField label="Support Link (Patreon, Kofi etc)" />
        <SimpleTextEditor
          content={description}
          onChange={setDescription}
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
              <Button size="small" variant="flat">
                Select Language Taught
              </Button>
              <Modal>
                <LanguageList heading="Language Taught" />
              </Modal>
            </DialogTrigger>
          </div>
        </div>

        <div className="section-container">
          <div className="label-bold">Course Language</div>
          <div>
            <DialogTrigger>
              <Button size="small" variant="flat">
                Select Course Language
              </Button>
              <Modal>
                <LanguageList heading="Course Language" />
              </Modal>
            </DialogTrigger>
          </div>
        </div>
      </div>
    </>
  );
};
