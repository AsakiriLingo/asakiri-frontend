import React from 'react';

import { Button } from '@/components/button';
import { DialogTrigger } from '@/components/dialog-trigger';
import { Modal } from '@/components/modal';
import { TextArea } from '@/components/text-area';
import { TextField } from '@/components/text-field';
import { LanguageList } from '@/features/course-creation/components/language-list';

import './course-creator.scss';

export const CourseCreator: React.FC = () => {
  return (
    <>
      <div className="creator-container">
        <TextField label="Course Name" />
        <TextField label="Course Short Description" />
        <TextArea label="Course Description" />
        <div className="creator-section-container">
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
        <div className="actions">
          <Button type="secondary" size="small" onPress={() => {}}>
            Create Course
          </Button>
        </div>
      </div>
    </>
  );
};
