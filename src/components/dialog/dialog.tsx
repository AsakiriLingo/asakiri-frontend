import React from 'react';

import './dialog.scss';
import { Button } from '@/components/button';
import { DialogTrigger } from '@/components/dialog-trigger';
import { Modal } from '@/components/modal';

interface DialogProps {
  header: string;
  text: string;
}

export const Dialog: React.FC<DialogProps> = ({
  text,
  header,
}: DialogProps) => {
  return (
    <>
      <DialogTrigger>
        <Button size="small" variant="flat">
          Dialog
        </Button>
        <Modal>
          <div className="dialog">
            <h3 className="dialog--header">{header}</h3>
            <p className="dialog--text">{text}</p>
            <div className="dialog--footer">
              <Button size="small" type="secondary">
                Cancel
              </Button>
              <Button size="small">Confirm</Button>
            </div>
          </div>
        </Modal>
      </DialogTrigger>
    </>
  );
};
