import { Database } from './database.types';

// Utility type to get the Row type from a table
type TableRow<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

// Profile
export type Profile = TableRow<'profiles'>;

// Course
export type Course = TableRow<'courses'> & {
  author: Profile;
  chapters?: Chapter[];
};

// Chapter
export type Chapter = TableRow<'chapters'> & {
  sections?: Section[];
};

// Section
export type Section = TableRow<'sections'>;

// Language
export type Language = TableRow<'languages'>;

// Course Enrollment
export type CourseEnrollment = TableRow<'course_enrollments'> & {
  course?: Course;
};

// Course Rating
export type CourseRating = TableRow<'course_ratings'> & {
  user?: Profile;
};

// Course Review
export type CourseReview = TableRow<'course_reviews'> & {
  user?: Profile;
};

// Common filter types
export interface CourseFilters {
  published_only?: boolean;
  author_id?: string;
  language_taught?: string;
  course_language?: string;
  search_term?: string;
  page?: number;
  per_page?: number;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface CourseDetails {
  course: Course;
  chapters: Chapter[];
  total_enrollments: number;
  is_enrolled?: boolean;
  user_rating?: CourseRating;
  user_review?: CourseReview;
}

// Request types
export interface CreateCourseRequest {
  title: string;
  short_description: string;
  description?: string;
  course_language_id: number;
  language_taught_id: number;
  thumbnail_url?: string;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {
  is_published?: boolean;
}

export interface CreateChapterRequest {
  title: string;
  subtitle?: string;
  description: string;
  course_id: string;
}

export interface CreateSectionRequest {
  title: string;
  subtitle?: string;
  content_html?: string;
  content_json?: [];
  chapter_id: string;
}

export interface CreateReviewRequest {
  course_id: string;
  rating: number;
  review_text: string;
}
