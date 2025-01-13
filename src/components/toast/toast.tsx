import React from 'react';
import { Toaster as SonnerToaster, toast as SonnerToast } from 'sonner';

import './toast.scss';

export const Toaster: React.FC = () => {
  return <SonnerToaster />;
};

export const toast = SonnerToast;
