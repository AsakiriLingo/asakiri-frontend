import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { BottomNavBar } from '@/components/bottom-nav-bar';
import { Button } from '@/components/button';
import { Head } from '@/components/seo';
import { TextField } from '@/components/text-field';
import { useCourseCreationAPI } from '@/features/course-creation/api/course-creation.ts';
import { CourseCard } from '@/features/course-creation/types/course-card-type.ts';
import { Card } from '@/features/courses/components/card';

import './search.scss';

const SearchRoute: React.FC = () => {
  const navigate = useNavigate();
  const { getAllPublishedCourses } = useCourseCreationAPI();
  const [searchResults, setSearchResults] = useState<CourseCard[]>([]);
  const { control, watch } = useForm<{ search: string }>({
    defaultValues: { search: '' },
  });

  const searchTerm = watch('search');
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      navigate('/');
    }
  }, [navigate]);
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      getAllPublishedCourses(searchTerm).then((res) => {
        if (res) {
          setSearchResults(res);
        }
      });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="search">
      <Head description="Search Courses" />
      <div className="search-container">
        <Button
          size="small"
          variant="ghost"
          onPress={() => window.history.back()}
        >
          ← Back
        </Button>

        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <TextField
              label="Search Courses"
              text={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              autoFocus
            />
          )}
        />

        {searchTerm ? (
          <div className="course-grid-container">
            <div className="course-header">
              <div className="course-heading">Search Results</div>
            </div>
            <div className="course-grid">
              {searchResults.length > 0 ? (
                searchResults.map((course) => (
                  <Card
                    key={course.id}
                    title={course.title}
                    short_description={course.short_description}
                    course_language={course.course_language}
                    language_taught={course.language_taught}
                    thumbnail={course.thumbnail}
                    id={course.id}
                    author_id={course.author_id}
                    author_name={course.author_name}
                    author_subtitle={course.author_subtitle}
                    author_avatar_url={course.author_avatar_url}
                    enrolled_students={course.enrolled_students}
                    created_at={course.created_at}
                    category=""
                    showTotalEnrolled={true}
                  />
                ))
              ) : (
                <p className="no-results">No courses found.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="placeholder-text">
            Start typing to search courses...
          </div>
        )}
      </div>

      <BottomNavBar />
    </div>
  );
};

export default SearchRoute;
