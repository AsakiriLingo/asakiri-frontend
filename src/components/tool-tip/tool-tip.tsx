import React from 'react';

import './tool-tip.scss';

interface ToolTipProps {
  children?: string;
}

export const ToolTip: React.FC<ToolTipProps> = ({ children }: ToolTipProps) => {
  return <div>{children}</div>;
};
