import React from 'react';
import { Modal as AriaModal } from 'react-aria-components';

import './modal.scss';

interface ModalProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  setIsOpen,
}: ModalProps) => {
  return (
    <>
      <AriaModal
        className="modal"
        isDismissable
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        {children}
      </AriaModal>
    </>
  );
};
