import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';

import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/', element: <AppLayout />,
    children: [
      { element: <Navigate replace to='home' />, index: true },
      {
        path: 'home',
        element: <HomePage />,
      },
    ],
  },
]);

export default function App() {
  return (
      <RouterProvider router={router} />
  );
}