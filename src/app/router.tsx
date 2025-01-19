import { useMemo, lazy } from 'react';
import { useQueryClient } from 'react-query';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

// const convert = (queryClient: QueryClient) => (m: object) => {
//   const { clientLoader, clientAction, default: Component, ...rest } = m;
//   return {
//     ...rest,
//     loader: clientLoader?.(queryClient),
//     action: clientAction?.(queryClient),
//     Component,
//   };
// };

const Home = lazy(() => import('./routes/landing.tsx'));
const CourseDetails = lazy(() => import('./routes/course-details.tsx'));
const CourseEditor = lazy(() => import('./routes/course-editor.tsx'));
const CourseSettings = lazy(() => import('./routes/course-settings.tsx'));
const CourseTeaching = lazy(() => import('./routes/teach.tsx'));
const CourseLearning = lazy(() => import('./routes/my-learning.tsx'));
const ProfileSettingsPage = lazy(() => import('./routes/profile-settings.tsx'));
const AboutPage = lazy(() => import('./routes/about.tsx'));
const PrivacyPolicyPage = lazy(() => import('./routes/privacy-policy.tsx'));

// interface ProjectsComponent {
//   default: React.ComponentType;
//   loader: LoaderFunction;
// }

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/course-details',
      element: <CourseDetails />,
    },
    {
      path: '/course-editor/:id',
      element: <CourseEditor />,
    },
    {
      path: '/course-settings/:id',
      element: <CourseSettings />,
    },
    {
      path: '/course-creator',
      element: <CourseSettings />,
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
      path: '/profile-settings',
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
