import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { useAuth } from '@/features/auth/hooks/use-auth.tsx';

// Lazy loaded components
const Login = lazy(() => import('./routes/auth/login'));
const SignUp = lazy(() => import('./routes/auth/sign-up'));
const AuthCallback = lazy(() => import('./routes/auth/callback'));
const Home = lazy(() => import('./routes/landing/landing.tsx'));
const CourseDetails = lazy(
  () => import('@/app/routes/course-view/details/details.tsx')
);
const CourseEditor = lazy(
  () => import('@/app/routes/course-creation/editor/course-editor.tsx')
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

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const LoadingFallback = () => <div>Loading...</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: '/auth/callback',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthCallback />
      </Suspense>
    ),
  },
  {
    path: '/course/details',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <CourseDetails />
      </Suspense>
    ),
  },
  {
    path: '/course/editor/:id',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute>
          <CourseEditor />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/course/viewer/:id',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute>
          <CourseViewer />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/course/editor/settings/:id',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute>
          <CourseSettings />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/course/create',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute>
          <CourseCreator />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/teach',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute>
          <CourseTeaching />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/my-learning',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute>
          <CourseLearning />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/profile',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProtectedRoute>
          <ProfileSettingsPage />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AboutPage />
      </Suspense>
    ),
  },
  {
    path: '/privacy-policy',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PrivacyPolicyPage />
      </Suspense>
    ),
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
