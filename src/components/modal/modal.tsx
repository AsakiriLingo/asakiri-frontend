import React from 'react';
import { Modal as AriaModal } from 'react-aria-components';

import './modal.scss';

interface ModalProps {
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }: ModalProps) => {
  return (
    <>
      <AriaModal className="modal">{children}</AriaModal>
    </>
  );
};
