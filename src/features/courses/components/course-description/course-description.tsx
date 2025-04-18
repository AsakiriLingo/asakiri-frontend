import React, { JSX } from 'react';

import './course-description.scss';
import { SimpleTextEditor } from '@/components/simple-text-editor';

interface CourseDescriptionProps {
  description: string;
}

export const CourseDescription: React.FC<CourseDescriptionProps> = ({
  description,
}: CourseDescriptionProps): JSX.Element => {
  return (
    <>
      <div className="course-description">
        <SimpleTextEditor
          content_html={description}
          editable={false}
          content_json={{}}
          onEditorChange={() => {}}
        />
      </div>
    </>
  );
};
