export interface EditorProps {
  content: string;
  placeholder?: string;
  editable?: boolean;
  autoFocus?: boolean;
  onChange?: (html: string) => void;
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
