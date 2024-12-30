import React from 'react';

import { Head } from '@/components/seo';
import { Card } from '@/features/courses/components/card';

const LandingRoute: React.FC = () => {
  return (
    <>
      <Head description={'Welcome to Asakiri'}></Head>
      <Card
        link="https://google.com"
        title="Japanese with Misa"
        author={{
          id: '1',
          name: 'Misa Sensei',
          subTitle: 'Japanese Teacher',
          avatar: '',
          description: 'Japanese language instructor',
        }}
        description="Tristique scelerisque sit duis eget mi at. Malesuada nulla cursus laoreet id aliquam. Et nisi pulvinar dictum mattis."
        courseLanguage="English"
        languageTaught="Japanese"
      ></Card>
    </>
  );
};

export default LandingRoute;
