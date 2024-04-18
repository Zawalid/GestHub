import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  RxDashboard,
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
  BsPeople,
  FiLogOut,
  IoSettingsOutline,
  IoBriefcaseOutline,
  IoDocumentsOutline,
  IoHomeOutline,
  LiaUserTieSolid,
  LuCalendarX,
  RiTeamLine,
} from './ui/Icons';

import { ROUTES } from '../utils/constants';
import { Button } from './ui';

const routesIcons = {
  overview: <IoHomeOutline />,
  interns: <BsPeople />,
  teams: <RiTeamLine />,
  supervisors: <LiaUserTieSolid />,
  absences: <LuCalendarX />,
  offers: <IoBriefcaseOutline />,
  demands: <IoDocumentsOutline />,
  projects: <RxDashboard />,
};

export default function Sidebar({ openSettings }) {
  const [isExpanded, setIsExpanded] = useState(window.matchMedia('(min-width: 1024px)').matches);
  const role = useSelector((state) => state.user?.role);
  const currentTab = useLocation().pathname.split('/')[2];
  const { t } = useTranslation();

  const spanClass = `transition-transform origin-left duration-500 text-sm text-text-secondary ${
    isExpanded ? 'md:scale-100' : 'scale-0'
  }`;

  useEffect(() => {
    const onresize = () => setIsExpanded(window.matchMedia('(min-width: 1024px)').matches);

    window.addEventListener('resize', onresize);

    return () => window.removeEventListener('resize', onresize);
  }, [isExpanded]);

  useEffect(() => {
    document.title = currentTab[0].toUpperCase() + currentTab.slice(1);
  }, [currentTab]);

  return (
    <aside
      className={`fixed top-0 z-[15] row-span-2 flex h-full flex-col gap-8 overflow-hidden bg-background-secondary py-5 transition-[width] duration-500 md:relative ${
        isExpanded ? 'w-full  px-3 md:w-[250px]' : 'w-14 px-2'
      }`}
    >
      <div className='flex items-center justify-between '>
        <img
          src='/images/logo-MEN-Stage.png'
          alt='logo'
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
      <ul className='space-y-1'>
        {ROUTES[role]
          .filter((r) => !r.includes('/'))
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
        <Link to='/' className='sidebar-element group w-full'>
          <FiLogOut />
          <span className={spanClass}>{t('app.sidebar.logout')}</span>
        </Link>
      </div>
    </aside>
  );
}
