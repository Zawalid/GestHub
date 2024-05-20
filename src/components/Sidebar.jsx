import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  RxDashboard,
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
  FiUserCheck,
  FiLogOut,
  IoSettingsOutline,
  IoBriefcaseOutline,
  IoDocumentsOutline,
  IoHomeOutline,
  LiaUserTieSolid,
  LuCalendarX,
  RiTeamLine,
  GrUserAdmin,
  FiUserX ,
  PiDevices 
} from './ui/Icons';

import { ROUTES } from '../utils/constants';
import { Button } from './ui';
import { capitalize, changeTitle } from '@/utils/helpers';
import { useLogout, useUser } from '@/hooks/useUser';
import { Logo } from './ui/Logo';

const routesIcons = {
  overview: <IoHomeOutline />,
  interns: <FiUserCheck />,
  teams: <RiTeamLine />,
  supervisors: <LiaUserTieSolid />,
  admins: <GrUserAdmin size={16} />,
  absences: <LuCalendarX />,
  offers: <IoBriefcaseOutline />,
  applications: <IoDocumentsOutline />,
  projects: <RxDashboard />,
  users: <FiUserX  />,
  sessions : <PiDevices  />
};

export default function Sidebar({ openSettings }) {
  const [isExpanded, setIsExpanded] = useState(window.matchMedia('(min-width: 1024px)').matches);
  const { user } = useUser();
  const { logout, isLoggingOut } = useLogout();
  const { t } = useTranslation();
  const location = useLocation().pathname.split('/');

  const spanClass = `transition-transform origin-left duration-500 text-sm text-text-secondary ${
    isExpanded ? 'md:scale-100' : 'scale-0'
  }`;

  useEffect(() => {
    const onresize = () => setIsExpanded(window.matchMedia('(min-width: 1024px)').matches);

    window.addEventListener('resize', onresize);

    return () => window.removeEventListener('resize', onresize);
  }, [isExpanded]);

  useEffect(() => {
    if (location.length === 3) changeTitle(capitalize(location[2]));
  }, [location]);

  return (
    <aside
      className={`fixed top-0 z-[15] row-span-2 flex h-full flex-col gap-8 overflow-hidden bg-background-secondary pt-3 pb-2 transition-[width] duration-500 md:relative ${
        isExpanded ? 'w-full  px-3 md:w-[250px]' : 'w-14 px-2'
      }`}
    >
      <div className='flex items-center justify-between '>
        <Logo
          className={`object-contain transition-all duration-500 ${isExpanded ? 'w-28 scale-100' : 'w-0 scale-0'}`}
        />
        <Button
          shape='icon'
          className={`not-active self-center ${isExpanded ? '' : 'mx-auto'}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <BsLayoutSidebarInset /> : <BsLayoutSidebarInsetReverse />}
        </Button>
      </div>
      <ul className='space-y-1 overflow-auto'>
        {ROUTES[user?.role]
          ?.filter((r) => !r.includes('/'))
          .map((route) => (
            <li key={route}>
              <NavLink to={`/app/${route}`} className='sidebar-element group'>
                {routesIcons[route]}
                <span className={spanClass}>{t(`app.sidebar.${route}`)}</span>
              </NavLink>
            </li>
          ))}
      </ul>

      <div className='mt-auto'>
        <button className='sidebar-element group w-full' onClick={openSettings}>
          <IoSettingsOutline />
          <span className={spanClass}>{t('app.sidebar.settings')}</span>
        </button>
        <button className='sidebar-element group w-full' onClick={logout}>
          <FiLogOut />
          <span className={spanClass}>{isLoggingOut ? 'Logging Out...' : t('app.sidebar.logout')}</span>
        </button>
      </div>
    </aside>
  );
}
