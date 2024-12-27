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
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(), [queryClient]);

  return <RouterProvider router={router} />;
};
