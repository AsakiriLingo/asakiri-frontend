export interface EditorProps {
  content: string;
  placeholder?: string;
  editable?: boolean;
  autoFocus?: boolean;
  onChange?: (html: string) => void;
  onUploadFile?: (file: File) => Promise<string>;
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
