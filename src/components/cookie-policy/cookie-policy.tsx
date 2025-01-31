import React from 'react';

import './cookie-policy.scss';
import { Button } from '@/components/button';

interface CookiePolicyProps {
  header?: string;
  text?: string;
}

export const CookiePolicy: React.FC<
  CookiePolicyProps
> = ({}: CookiePolicyProps) => {
  return (
    <>
      <div className="cookie-body">
        <p className="cookie-text">
          We use cookies in order to personalize your site experience. You can
          check our
          <a href="/privacy-policy"> privacy policy</a> for more information.
        </p>
        <div className="cookie-buttons">
          <Button size="small">Accept</Button>
          <Button size="small" type="tertiary">
            Reject
          </Button>
        </div>
      </div>
    </>
  );
};
