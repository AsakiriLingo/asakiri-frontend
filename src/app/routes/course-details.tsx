import React from 'react';

import { CourseSidebar } from '@/components/course-sidebar';
import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import { HeroCard } from '@/features/courses/components/hero-card';
import { InstructorCard } from '@/features/courses/components/instructor-card';

import './course-details.scss';

const CourseDetailsRoute: React.FC = () => {
  return (
    <>
      <CourseSidebar />
      <Head description={'Course Content'}></Head>
      <NavBar />
      <header className="hero-container">
        <HeroCard
          courseID="1"
          title="Japanese with Misa"
          description="To master basic Japanese conversation and writing systems, start with essential phrases like greetings and self-introductions while learning the three writing systems: Hiragana (the basic phonetic script with 46 characters used for native Japanese words and grammar), Katakana (another 46-character phonetic script used mainly for foreign words), and basic Kanji (Chinese characters representing concepts)."
          thumbnail="/spanish.jpg"
        />
      </header>
      <section>
        <div className="instructor-container">
          <InstructorCard
            name="Misa Amane"
            subTitle="subtitle"
            description="description"
            avatar=""
            id={''}
          />
        </div>
      </section>
    </>
  );
};

export default CourseDetailsRoute;
