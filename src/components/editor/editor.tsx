import Quill from 'quill';
import React, { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css';

interface EditorProps {
  content: string;
  placeholder?: string;
  editable?: boolean;
  autoFocus?: boolean;
  onChange?: (html: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [{ background: [] }],
  ['link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [
    {
      color: [
        'var(--on-surface)',
        'var(--colors-error-e-40)',
        'var(--colors-primary-p-40)',
        'var(--colors-secondary-s-40)',
        'var(--colors-primary-p-60)',
      ],
    },
  ],
  ['image'],
  ['clean'],
  ['table'],
  ['video'],
];

export const Editor: React.FC<EditorProps> = ({
  content,
  onChange,
  onImageUpload,
  placeholder = '',
  editable = true,
  autoFocus = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];
          if (file && onImageUpload) {
            try {
              const url = await onImageUpload(file);
              const range = quillRef.current?.getSelection();
              if (range && quillRef.current) {
                quillRef.current.insertEmbed(range.index, 'image', url);
              }
            } catch (error) {
              console.error('Error uploading image:', error);
            }
          }
        };
      };

      const quill = new Quill(editorRef.current, {
        modules: {
          toolbar: editable
            ? {
                container: TOOLBAR_OPTIONS,
                handlers: {
                  image: imageHandler,
                },
              }
            : false,
        },
        placeholder,
        readOnly: !editable,
        theme: 'snow',
      });

      if (content) {
        quill.root.innerHTML = content;
      }

      if (autoFocus) {
        quill.focus();
      }

      quill.on('text-change', () => {
        const html = quill.root.innerHTML;
        onChange?.(html);
      });

      quillRef.current = quill;
    }
  }, []);

  useEffect(() => {
    if (quillRef.current && content !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = content;
    }
  }, [content]);

  return (
    <div className={`quill-editor ${!editable ? 'readonly' : ''}`}>
      <div ref={editorRef} />
    </div>
  );
};

export default Editor;
