export interface EditorProps {
  content_html: string;
  content_json: object;
  placeholder?: string;
  editable?: boolean;
  autoFocus?: boolean;
  onUploadFile?: (file: File) => Promise<string>;
  onEditorChange: (data: { html: string; json: object }) => void;
}

export interface PopoverProps {
  onClose: () => void;
  onSubmit: (value: string) => void;
  placeholder: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export interface ColorOption {
  name: string;
  color: string;
}

export interface ColorPopoverProps
  extends Omit<PopoverProps, 'onSubmit' | 'placeholder'> {
  onSelectColor: (color: string) => void;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fileHandler: {
      insertFile: (file: File) => ReturnType;
    };
  }
}
