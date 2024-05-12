import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Toaster } from 'sonner';
import { FaSpinner } from 'react-icons/fa6';

import { useTheme } from './hooks/useTheme';
import { ROUTES } from './utils/constants';
import './styles/App.css';

import { AppLayout, AuthLayout, HomePageLayout } from './layouts';
import {
  Overview,
  Interns,
  Supervisors,
  NotFound,
  HomePage,
  Offers,
  Applications,
  Projects,
  ProjectDetails,
  Login,
  Register,
  HomePageOffers,
  Admins,
} from './pages';

import { ProtectedRoute } from './components/ProtectedRoute';
import { useUser } from './hooks/useUser';

const routesElements = {
  overview: <Overview />,
  admins: <Admins />,
  supervisors: <Supervisors />,
  interns: <Interns />,
  'interns/:id': <Interns />,
  offers: <Offers />,
  'offers/:id': <Offers />,
  applications: <Applications />,
  'applications/:id': <Applications />,
  projects: <Projects />,
  'projects/new': <Projects />,
  'projects/:id': <ProjectDetails />,
  'projects/:id/:tab': <ProjectDetails />,
};

export default function App() {
  const { theme } = useTheme();
  const { user } = useUser();
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <>
      <div className='h-dvh w-full' ref={parent}>
        <BrowserRouter>
          <Routes>
            {/* Auth */}
            <Route element={<AuthLayout />}>
              <Route path='login' index element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
            {/* HomePage */}
            <Route path='/' element={<HomePageLayout />}>
              <Route index element={<HomePage />} />
              {user?.role === 'user' && (
                <Route path='applications' element={<HomePage />}>
                  <Route path=':id' element={<HomePage />} />
                </Route>
              )}
              <Route path='offers' element={<HomePageOffers />}>
                <Route path=':id' element={<HomePageOffers />} />
              </Route>
            </Route>
            {/* App */}
            {user?.role !== 'user' && (
              <Route
                path='app'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to='/app/overview' replace={true} />} />
                {/*  Routes of specific role */}
                {ROUTES[user?.role]?.map((route) => (
                  <Route key={route} path={route} element={<ProtectedRoute>{routesElements[route]}</ProtectedRoute>} />
                ))}
                <Route path='*' element={<NotFound />} />
              </Route>
            )}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster
        icons={{
          loading: <FaSpinner className='animate-spin text-lg text-text-secondary' />,
        }}
        position={window.innerWidth < 768 ? 'bottom-center' : 'bottom-right'}
        theme={theme}
        toastOptions={{
          className: 'sonner-toast',
          duration: 2000,
        }}
      />
    </>
  );
}
