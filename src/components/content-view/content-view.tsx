import React from 'react';

import './content-view.scss';
import { Editor } from '@/features/course-creation/components/editor';

interface ContentViewProps {
  content: string;
}

export const ContentView: React.FC<ContentViewProps> = ({
  content,
}: ContentViewProps) => {
  return (
    <div className="content-viewer">
      <Editor content={content} editable={false} />
    </div>
  );
};
