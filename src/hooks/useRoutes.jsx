import { useUser } from './useUser';
import {
  RxDashboard,
  FiUserCheck,
  IoBriefcaseOutline,
  IoDocumentsOutline,
  IoHomeOutline,
  LiaUserTieSolid,
  GrUserAdmin,
  FiUserX,
  PiDevices,
  MdOutlineEmail,
} from '@/components/ui/Icons';

const pages = {
  admins: ['admins', 'admins/:id'],
  supervisors: ['supervisors', 'supervisors/:id'],
  projects: ['projects', 'projects/:id', 'projects/:id/:tab'],
  interns: ['interns', 'interns/:id'],
  offers: ['offers', 'offers/:id'],
  applications: ['applications', 'applications/:id'],
  users: ['users', 'users/:id'],
  sessions: ['sessions'],
  emails: ['emails', 'emails/:id'],
};
const generate = (types) => {
  return Object.keys(pages).reduce((acc, key) => (types.includes(key) ? [...acc, ...pages[key]] : acc), ['overview']);
};
const userRoutes = {
  'super-admin': [
    ...generate([
      'admins',
      'supervisors',
      'projects',
      'interns',
      'offers',
      'applications',
      'users',
      'sessions',
      'emails',
    ]),
    'projects/new',
    'sessions/:id',
  ],
  admin: generate(['supervisors', 'projects', 'interns', 'offers', 'applications', 'users', 'sessions', 'emails']),
  supervisor: generate(['projects', 'sessions']),
  intern: generate(['projects', 'sessions']),
  user: pages.applications,
};

const routesIcons = {
  overview: <IoHomeOutline />,
  interns: <FiUserCheck />,
  supervisors: <LiaUserTieSolid />,
  admins: <GrUserAdmin size={16} />,
  offers: <IoBriefcaseOutline />,
  applications: <IoDocumentsOutline />,
  projects: <RxDashboard />,
  users: <FiUserX />,
  sessions: <PiDevices />,
  emails: <MdOutlineEmail />,
};

export function useRoutes() {
  const { user } = useUser();
  const routes = userRoutes[user?.role] || [];
  return {
    routes,
    sidebar: Object.keys(routesIcons)
      .filter((r) => !r.includes('/'))
      .reduce((acc, r) => {
        if (routes.includes(r)) acc.push({ name: r, icon: routesIcons[r] });
        return acc;
      }, []),
  };
}
