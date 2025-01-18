import React from 'react';

import './user-verification-card.scss';
import { Button } from '@/components/button';

export const UserVerificationCard: React.FC = () => {
  return (
    <div className="user-verification-card">
      <h2 className="heading">Verify your account to perform this action.</h2>
      <Button size="small">Resend Verification Link</Button>
    </div>
  );
};
