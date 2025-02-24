import React from 'react';

import { Footer } from '@/components/footer';
import { NavBar } from '@/components/nav-bar';
import { Seo } from '@/components/seo';
import './supporters.scss';

const SupportersRoute: React.FC = () => {
  return (
    <>
      <Seo description={'Asakiri | Supporters'}></Seo>
      <NavBar />
      <div className="main">
        <iframe
          id="kofiframe"
          src="https://ko-fi.com/asakiri/?hidefeed=true&widget=true&embed=true&preview=true"
          height="1312"
          className="kofiframe"
          title="asakiri"
        ></iframe>
        <div className="container">
          <h1>Supporters</h1>

          <h2>Asakiri Hero</h2>
          <p>Alok Singh</p>
          <p>Sonnenkind</p>

          <h2>Asakiri Ambassador</h2>
          <p>Sonnenkind</p>
          <p>Kama</p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default SupportersRoute;
