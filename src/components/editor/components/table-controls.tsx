import { Table as TableIcon, RowsIcon, ColumnsIcon } from 'lucide-react';
import React from 'react';

import { FeatureProps } from '../types/menubar.types.ts';

import { MenuButton } from './menu-button.tsx';

export const TableControls: React.FC<FeatureProps> = ({ editor }) => {
  if (!editor?.isActive('table')) {
    return (
      <MenuButton
        editor={editor}
        onClick={() =>
          editor
            ?.chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        <TableIcon className="icon" />
      </MenuButton>
    );
  }

  return (
    <>
      <MenuButton
        editor={editor}
        onClick={() => editor?.chain().focus().addColumnAfter().run()}
        tooltipText="Add column"
      >
        <ColumnsIcon className="icon" />
      </MenuButton>
      <MenuButton
        editor={editor}
        onClick={() => editor?.chain().focus().addRowAfter().run()}
        tooltipText="Add row"
      >
        <RowsIcon className="icon" />
      </MenuButton>
      <MenuButton
        editor={editor}
        onClick={() => editor?.chain().focus().deleteColumn().run()}
        tooltipText="Delete column"
      >
        <ColumnsIcon className="icon" style={{ color: 'var(--error)' }} />
      </MenuButton>
      <MenuButton
        editor={editor}
        onClick={() => editor?.chain().focus().deleteRow().run()}
        tooltipText="Delete row"
      >
        <RowsIcon className="icon" style={{ color: 'var(--error)' }} />
      </MenuButton>
    </>
  );
};
