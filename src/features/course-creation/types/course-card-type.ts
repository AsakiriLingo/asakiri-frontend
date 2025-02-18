export interface CourseCard {
  id: string;
  title: string;
  short_description: string;
  thumbnail: string;
  language_taught: string;
  course_language: string;
  author_id: string;
  author_name: string;
  author_subtitle: string;
  author_avatar_url: string;
  enrolled_students: number;
  created_at: string;
  category: string;
}

export interface HomepageCoursesResponse {
  popularCourses: CourseCard[];
  trendingCourses: CourseCard[];
  recentCourses: CourseCard[];
}
