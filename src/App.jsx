import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useSelector } from 'react-redux';
import { Toaster } from 'sonner';
import { FaSpinner } from 'react-icons/fa6';

import { useTheme } from './hooks/useTheme';
import { ROUTES } from './utils/constants';
import './styles/App.css';

import { AppLayout, AuthLayout, HomePageLayout } from './layouts';
import {
  Overview,
  Absences,
  Interns,
  Supervisors,
  Teams,
  NotFound,
  HomePage,
  Offers,
  Demands,
  Projects,
  SupervisorDetails,
  InternDetails,
  ProjectDetails,
  OfferDetails,
  Login,
  Register,
} from './pages';

import Tasks from './features/projects/ProjectOverview/Tasks';
import ProjectOverview from './features/projects/ProjectOverview/Overview';

const queryClient = new QueryClient();

const routesElements = {
  overview: <Overview />,
  supervisors: <Supervisors />,
  'supervisors/:id': <SupervisorDetails />,
  interns: <Interns />,
  'interns/:id': <InternDetails />,
  teams: <Teams />,
  absences: <Absences />,
  offers: <Offers />,
  'offers/:id': <Offers />,
  demands: <Demands />,
  projects: <Projects />,
  'projects/new': <Projects />,
  'projects/:id': <ProjectDetails />,
  'projects/:id/:tab': <ProjectDetails />,
};

export default function App() {
  const theme = useTheme();
  const role = useSelector((state) => state.user?.role);
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <>
      <div className='h-dvh w-full' ref={parent}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
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
                <Route path='/offers/:id' element={<HomePage />} />

              </Route>
              {/* App */}
              <Route path='app' element={<AppLayout />}>
                <Route index element={<Navigate to='/app/overview' />} />
                {/* Routes of every role */}
                <Route path='overview' element={<Overview />} />
                <Route path='absences' element={<Absences />} />

                {/*  Routes of specific role */}
                {ROUTES[role].map((route) => (
                  <Route key={route} path={route} element={routesElements[route]} />
                ))}

                {/* <Route path='projects/:id' element={<ProjectDetails />}>
                  <Route index element={<Navigate to='overview' />} />
                  <Route path='overview' element={<ProjectOverview />} />
                  <Route path='tasks' element={<Tasks />} />
                </Route> */}
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
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
