import { Loader2 } from 'lucide-react';
import React from 'react';

import './loading-spinner.scss';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  fullscreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  color = 'var(--primary)',
  fullscreen = true,
}) => {
  const spinnerClass = fullscreen
    ? 'loading-spinner loading-spinner--fullscreen'
    : 'loading-spinner';

  return (
    <div className={spinnerClass}>
      <Loader2 size={size} color={color} className="loading-spinner__icon" />
    </div>
  );
};

export default LoadingSpinner;
