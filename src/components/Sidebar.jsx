import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse, FiLogOut, IoSettingsOutline } from './ui/Icons';
import { Button } from './ui';
import { capitalize, changeTitle } from '@/utils/helpers';
import { useLogout } from '@/hooks/useUser';
import { Logo } from './ui/Logo';
import { useCount } from '@/features/overview/useStats';
import { useSettings } from '@/features/settings/useSettings';
import { useAutoAnimate } from '@/hooks/useAutoAnimate';
import { useRoutes } from '@/hooks/useRoutes';

export default function Sidebar({ openSettings }) {
  const [isExpanded, setIsExpanded] = useState(window.matchMedia('(min-width: 1024px)').matches);
  const { logout, isLoggingOut } = useLogout();
  const { count } = useCount();
  const { sidebar } = useRoutes();
  const { settings } = useSettings(true);
  const { t } = useTranslation();
  const [parent] = useAutoAnimate();

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
      className={`fixed top-0 z-[15] row-span-2 flex h-full flex-col gap-8 overflow-hidden bg-background-secondary pb-2 pt-3 transition-[width] duration-500 md:relative ${
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
      <ul
        className={`relative space-y-1 overflow-y-auto overflow-x-hidden ${isExpanded ? 'pr-2' : 'no_scrollbar'}`}
        ref={parent}
      >
        {sidebar
          ?.filter((r) => settings?.showInSideBar.includes(r.name))
          .map(({ name, icon }) => (
            <li key={name}>
              <NavLink to={`/app/${name}`} className='sidebar-element group '>
                {icon}
                <span className={spanClass}>{t(`app.sidebar.${name}`)}</span>
                {count?.[name] >= 0 && settings?.showCount && <span className='count text-xs'>{count[name]}</span>}
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
