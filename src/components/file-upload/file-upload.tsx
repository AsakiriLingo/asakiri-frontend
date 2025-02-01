import React from 'react';
import { FileTrigger as AriaFileTrigger } from 'react-aria-components';

type FileType = 'image' | 'pdf';

interface FileUploadProps {
  children?: React.ReactNode;
  fileType?: FileType;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  children,
  fileType = 'image',
}: FileUploadProps) => {
  const getAcceptedFileTypes = (type: FileType): string[] => {
    switch (type) {
      case 'image':
        return ['image/png', 'image/jpeg'];
      case 'pdf':
        return ['application/pdf'];
      default:
        return [];
    }
  };

  return (
    <AriaFileTrigger acceptedFileTypes={getAcceptedFileTypes(fileType)}>
      {children}
    </AriaFileTrigger>
  );
};
