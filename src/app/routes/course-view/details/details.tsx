import React from 'react';

import { NavBar } from '@/components/nav-bar';
import { Head } from '@/components/seo';
import { ChaptersCard } from '@/features/courses/components/chapters-card';
import { HeroCard } from '@/features/courses/components/hero-card';
import { InstructorCard } from '@/features/courses/components/instructor-card';
import { CourseViewData } from '@/mocks/course.ts';
import './details.scss';

const CourseDetailsRoute: React.FC = () => {
  return (
    <>
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
      <section className="section-container">
        <div className="instructor-container">
          <InstructorCard
            name="Misa Amane"
            subTitle="subtitle"
            description="Sit semper aenean enim id consequat pretium bibendum. Placerat morbi sit interdum egestas est. Scelerisque in in nullam risus vitae aliquam mauris velit nulla. Vel proin arcu euismod sit scelerisque turpis aliquam sagittis. Lorem tristique dolor aliquet."
            avatar=""
            id={''}
          />
        </div>
        <div className="section-right">
          <ChaptersCard chapters={CourseViewData} />
        </div>
      </section>
    </>
  );
};

export default CourseDetailsRoute;
