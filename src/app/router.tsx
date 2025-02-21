import { useMemo, lazy } from 'react';
import { useQueryClient } from 'react-query';
import { createBrowserRouter, Navigate } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import SearchRoute from '@/app/routes/search/search.tsx';

const Home = lazy(() => import('./routes/landing/landing.tsx'));
const CourseDetails = lazy(
  () => import('@/app/routes/course-view/details/details.tsx')
);
const SignInPage = lazy(() => import('@/app/routes/auth/sign-in.tsx'));
const SignUpPage = lazy(() => import('@/app/routes/auth/sign-up.tsx'));

const CourseEditor = lazy(
  () => import('@/app/routes/course-creation/editor/editor.tsx')
);
const CourseViewer = lazy(
  () => import('@/app/routes/course-view/viewer/viewer.tsx')
);
const CourseSettings = lazy(
  () => import('@/app/routes/course-creation/settings/settings.tsx')
);
const CourseCreator = lazy(
  () => import('@/app/routes/course-creation/creator/creator.tsx')
);
const CourseTeaching = lazy(
  () => import('@/app/routes/teacher/teach/teach.tsx')
);
const CourseLearning = lazy(
  () => import('@/app/routes/learner/my-learning/my-learning.tsx')
);
const ProfileSettingsPage = lazy(() => import('./routes/profile/profile.tsx'));
const AboutPage = lazy(
  () => import('@/app/routes/static-pages/about/about.tsx')
);
const PrivacyPolicyPage = lazy(
  () => import('@/app/routes/static-pages/privacy-and-terms/privacy-policy.tsx')
);

const TermsPage = lazy(
  () => import('@/app/routes/static-pages/privacy-and-terms/terms.tsx')
);

const SupportersPage = lazy(
  () => import('@/app/routes/static-pages/supporters/supporters.tsx')
);

const PartnersPage = lazy(() => import('@/app/routes/partners/partners.tsx'));

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/auth/callback',
      element: <Navigate to="/" replace />,
    },
    {
      path: 'course/details/:id',
      element: <CourseDetails />,
    },
    {
      path: 'course/editor/:id',
      element: <CourseEditor />,
    },
    {
      path: 'course/viewer/:id',
      element: <CourseViewer />,
    },
    {
      path: 'course/editor/settings/:id',
      element: <CourseSettings />,
    },
    {
      path: 'course/create',
      element: <CourseCreator />,
    },
    {
      path: '/teach',
      element: <CourseTeaching />,
    },
    {
      path: '/sign-in',
      element: <SignInPage />,
    },
    {
      path: '/sign-up',
      element: <SignUpPage />,
    },
    {
      path: '/my-learning',
      element: <CourseLearning />,
    },
    {
      path: '/profile',
      element: <ProfileSettingsPage />,
    },
    {
      path: '/about',
      element: <AboutPage />,
    },
    {
      path: '/privacy-policy',
      element: <PrivacyPolicyPage />,
    },
    {
      path: '/terms',
      element: <TermsPage />,
    },
    {
      path: '/supporters',
      element: <SupportersPage />,
    },
    {
      path: '/partners',
      element: <PartnersPage />,
    },
    {
      path: '/search',
      element: <SearchRoute />,
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(), [queryClient]);

  return <RouterProvider router={router} />;
};
