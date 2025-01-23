import { useMemo, lazy } from 'react';
import { useQueryClient } from 'react-query';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

const Home = lazy(() => import('./routes/landing/landing.tsx'));
const CourseDetails = lazy(
  () => import('@/app/routes/course-view/details/details.tsx')
);
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
  () => import('@/app/routes/static-pages/privacy-policy/privacy-policy.tsx')
);

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'course/details',
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
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(), [queryClient]);

  return <RouterProvider router={router} />;
};
