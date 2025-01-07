import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Image,
  PlayCircle,
  Type,
  AudioLines,
  Table,
} from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

import './editor.scss';

interface EditorProps {
  content: string;
  onChange?: (html: string) => void;
}

interface PopoverProps {
  onClose: () => void;
  onSubmit: (value: string) => void;
  placeholder: string;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const Popover: React.FC<PopoverProps> = ({
  onClose,
  onSubmit,
  placeholder,
  buttonRef,
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    inputRef.current?.focus();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value) {
      onSubmit(value);
      setValue('');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="popover" ref={popoverRef}>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </form>
    </div>
  );
};

export const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  const [showLinkPopover, setShowLinkPopover] = useState(false);
  const [showYoutubePopover, setShowYoutubePopover] = useState(false);
  const linkButtonRef = useRef<HTMLButtonElement>(null);
  const youtubeButtonRef = useRef<HTMLButtonElement>(null);

  const editor = useEditor({
    content,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
        modestBranding: true,
        HTMLAttributes: {
          class: 'editor-youtube',
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  const addLink = (url: string) => {
    if (!editor) return;

    if (editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'text',
          marks: [{ type: 'link', attrs: { href: url } }],
          text: url,
        })
        .run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addYoutubeVideo = (url: string) => {
    if (!editor) return;
    editor.commands.setYoutubeVideo({ src: url });
  };

  const MenuBar = () => {
    if (!editor) return null;

    return (
      <div className="editor-menu">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`menu-button ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
        >
          <Heading1 className="icon" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`menu-button ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
        >
          <Heading2 className="icon" />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`menu-button paragraph ${editor.isActive('paragraph') ? 'is-active' : ''}`}
        >
          <Type className="icon" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`menu-button ${editor.isActive('bold') ? 'is-active' : ''}`}
        >
          <Bold className="icon" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`menu-button ${editor.isActive('italic') ? 'is-active' : ''}`}
        >
          <Italic className="icon" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`menu-button ${editor.isActive('bulletList') ? 'is-active' : ''}`}
        >
          <List className="icon" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`menu-button ${editor.isActive('orderedList') ? 'is-active' : ''}`}
        >
          <ListOrdered className="icon" />
        </button>
        <button
          ref={linkButtonRef}
          onClick={() => setShowLinkPopover(!showLinkPopover)}
          className={`menu-button ${editor.isActive('link') ? 'is-active' : ''}`}
        >
          <Link2 className="icon" />
        </button>
        <button
          onClick={() => {
            /* Add image handler */
          }}
          className="menu-button tooltip-button"
          disabled
          data-tooltip="Image upload coming soon"
        >
          <Image className="icon" />
        </button>
        <button
          onClick={() => {
            /* Add audio handler */
          }}
          className="menu-button tooltip-button"
          disabled
          data-tooltip="Audio upload coming soon"
        >
          <AudioLines className="icon" />
        </button>
        <button
          onClick={() => {}}
          className="menu-button tooltip-button"
          disabled
          data-tooltip="Table coming soon"
        >
          <Table className="icon" />
        </button>
        <button
          ref={youtubeButtonRef}
          onClick={() => setShowYoutubePopover(!showYoutubePopover)}
          className="menu-button tooltip-button"
          data-tooltip="Youtube video"
        >
          <PlayCircle className="icon" />
        </button>

        {showLinkPopover && (
          <Popover
            onClose={() => setShowLinkPopover(false)}
            onSubmit={addLink}
            placeholder="Enter URL"
            buttonRef={linkButtonRef}
          />
        )}

        {showYoutubePopover && (
          <Popover
            onClose={() => setShowYoutubePopover(false)}
            onSubmit={addYoutubeVideo}
            placeholder="Enter YouTube URL"
            buttonRef={youtubeButtonRef}
          />
        )}
      </div>
    );
  };

  return (
    <div className="tiptap-editor">
      <MenuBar />
      <EditorContent editor={editor} />
    </div>
  );
};
