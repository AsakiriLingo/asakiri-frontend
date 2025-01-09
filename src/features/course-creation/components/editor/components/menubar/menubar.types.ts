import { Editor } from '@tiptap/react';

export interface MenuButtonProps {
  editor: Editor | null;
  isActive?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tooltipText?: string;
  disabled?: boolean;
}

export interface FeatureProps {
  editor: Editor | null;
}
