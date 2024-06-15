import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAutoAnimate } from '@/hooks/useAutoAnimate';
import { Toaster } from 'sonner';
import { FaSpinner } from 'react-icons/fa6';

import { useTheme } from './hooks/useTheme';
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
  Admins,
  Users,
  Sessions,
  About,
  Contact,
  Emails,
} from './pages';

import { ProtectedRoute } from './components/ProtectedRoute';
import { useUser } from './hooks/useUser';
import { useRoutes } from './hooks/useRoutes';
import { useSettings } from './features/settings/useSettings';

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
  users: <Users />,
  sessions: <Sessions />,
  'sessions/:id': <Sessions />,
  emails: <Emails />,
  'emails/:id': <Emails />,
};

export default function App() {
  const { theme } = useTheme();
  const { user } = useUser();
  const { routes } = useRoutes();
  const { settings } = useSettings(true);
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
              <Route path='/:id' element={<HomePage />} />

              {user?.role === 'user' && (
                <Route path='applications' element={<HomePage />}>
                  <Route path=':id' element={<HomePage />} />
                </Route>
              )}

              <Route path='contact' element={<Contact />} />
              <Route path='about' element={<About />} />
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
                <Route index element={<Navigate to={`/app/${settings?.defaultHomeView}`} replace={true} />} />
                {/*  Routes of specific role */}
                {routes?.map((route) => (
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
