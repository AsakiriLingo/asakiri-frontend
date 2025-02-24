import React from 'react';

import { Footer } from '@/components/footer';
import { NavBar } from '@/components/nav-bar';
import { Seo } from '@/components/seo';
import './privacy-and-terms.scss';

const TermsRoute: React.FC = () => {
  return (
    <>
      <Seo description={'Asakiri | Terms'}></Seo>
      <NavBar />
      <div className="main">
        <div className="container">
          <h1>Terms of Service</h1>

          <h2>1. Course Content Ownership</h2>
          <p>
            Course creators retain full intellectual property rights to their
            original course content, including but not limited to course
            materials, video content, written materials, exercises and
            assignments, and custom graphics and illustrations.
          </p>
          <p>
            By uploading content to Asakiri, creators grant us a non-exclusive
            license to host and distribute their content through our platform.
          </p>

          <h2>2. Content Guidelines</h2>

          <h3>2.1. Prohibited Content</h3>
          <p>Users agree not to upload, create, or distribute content that:</p>
          <p>
            - Promotes hate speech or discrimination based on race, ethnicity,
            gender, religion, sexual orientation, disability, or any other
            protected characteristic
            <br />
            - Contains explicit sexual content or pornography
            <br />
            - Depicts graphic violence or gore
            <br />
            - Promotes terrorism or extremist ideologies
            <br />
            - Violates copyright or other intellectual property rights
            <br />
            - Contains malware or harmful code
            <br />- Harasses, bullies, or threatens others
          </p>

          <h3>2.2. Language and Behavior</h3>
          <p>Users must:</p>
          <p>
            - Use appropriate, professional language
            <br />
            - Maintain respectful communication in all interactions
            <br />
            - Avoid offensive, vulgar, or obscene content
            <br />- Refrain from harmful stereotyping or discriminatory language
          </p>

          <h3>2.3. Content Moderation</h3>
          <p>Asakiri reserves the right to:</p>
          <p>
            - Review all uploaded content
            <br />
            - Remove content that violates these guidelines
            <br />
            - Suspend or terminate accounts that repeatedly violate these terms
            <br />- Modify these guidelines as needed to maintain platform
            integrity
          </p>

          <h2>3. Platform Rights</h2>
          <p>Asakiri maintains the right to:</p>
          <p>
            - Monitor and review all platform content
            <br />
            - Remove content that violates our guidelines
            <br />
            - Modify or discontinue services
            <br />- Update these terms of service with reasonable notice
          </p>

          <h2>4. User Responsibilities</h2>
          <p>Users agree to:</p>
          <p>
            - Provide accurate information
            <br />
            - Maintain account security
            <br />
            - Report violations of these terms
            <br />- Comply with all applicable laws and regulations
          </p>

          <h2>5. Enforcement</h2>
          <p>Violations may result in:</p>
          <p>
            - Content removal
            <br />
            - Account suspension
            <br />
            - Account termination
            <br />- Legal action where applicable
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            Asakiri may modify these terms at any time with notice to users.
            Continued use of the platform constitutes acceptance of updated
            terms.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default TermsRoute;
