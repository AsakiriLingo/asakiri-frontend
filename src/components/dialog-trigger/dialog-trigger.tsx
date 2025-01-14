import React from 'react';
import { DialogTrigger as AriaDialogTrigger } from 'react-aria-components';

import './dialog-trigger.scss';

interface DialogTriggerProps {
  children?: React.ReactNode;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({
  children,
}: DialogTriggerProps) => {
  return <AriaDialogTrigger>{children}</AriaDialogTrigger>;
};
