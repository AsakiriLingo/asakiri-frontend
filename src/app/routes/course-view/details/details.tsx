import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/button';
import { Head } from '@/components/seo';
import { toast } from '@/components/toast';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation.ts';
import { ChaptersCard } from '@/features/courses/components/chapters-card';
import { CourseDescription } from '@/features/courses/components/course-description';
import { HeroCard } from '@/features/courses/components/hero-card';
import { InstructorCard } from '@/features/courses/components/instructor-card';
import { Course } from '@/types/course.types.ts';

import './details.scss';

const CourseDetailsRoute: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { getCourseDetail, enrollInCourse, checkEnrollment } =
    useCourseCreationAPI();
  const [course, setCourse] = useState<Course>();
  useEffect(() => {
    if (id) {
      refetchCourse();
      checkEnrollment(id).then((enrolled) => {
        if (enrolled !== undefined) {
          setIsEnrolled(enrolled);
        }
      });
    }
  }, [id]);
  const refetchCourse = async () => {
    if (id) {
      const updatedCourse = await getCourseDetail(id);
      if (updatedCourse.data) {
        setCourse(updatedCourse.data);
      }
      return updatedCourse;
    }
  };
  const handleJoinCourse = async () => {
    if (!id || !course) return;
    const response = await enrollInCourse(id);
    if (response.data) {
      setIsEnrolled(true);
      toast.success(`You are successfully enrolled to ${course.title}`);
      navigate(`/course/viewer/${id}`);
    } else {
      console.error('Failed to enroll:', response.error);
      toast.error(`Something Went Wrong`);
    }
  };

  if (!course || !id) {
    return <div />;
  }
  return (
    <>
      <Head
        title={course?.title}
        description={course?.short_description}
      ></Head>
      <div className="details-header">
        <div className="details-header__left">
          <Button type="secondary" size="small" onPress={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>
      <header className="hero-container">
        <HeroCard
          courseID={id}
          course={course}
          isEnrolled={isEnrolled}
          enrollInCourse={handleJoinCourse}
        />
      </header>
      <section className="section-container">
        <div className="instructor-container">
          <InstructorCard
            name={course.author?.name || ''}
            subtitle={course.author?.subtitle || ''}
            bio={course.author?.bio || ''}
            avatar_url={course.author?.avatar_url || ''}
            id={course.author?.id || ''}
          />
        </div>
        <div className="section-right">
          <CourseDescription description={course.description_html} />
          <ChaptersCard chapters={course.chapters} />
        </div>
      </section>
    </>
  );
};

export default CourseDetailsRoute;
