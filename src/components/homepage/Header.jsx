import { useEffect, useState } from 'react';
import { NavLink, useHref } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MobileHeader } from './MobileHeader';
import { AuthSwitcher } from '../AuthSwitcher';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Button, Logo } from '../ui';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Notifications } from '@/features/notifications/Notifications';
import { useUser } from '@/hooks/useUser';
import { HOMEPAGE_ROUTES } from '@/utils/constants';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const currentPath = useHref().split('/')[1];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  return (
    <header className='bg-background-disabled flex items-center justify-between border-b border-border p-5'>
      <Logo className='w-28' />
      <Links />

      <div className='flex items-center gap-4'>
        <div className='hidden gap-4 lg:flex'>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        {user && <Notifications />}
        <AuthSwitcher />
        <Button shape='icon' onClick={() => setIsMobileMenuOpen(true)} className='lg:hidden'>
          <RxHamburgerMenu />
        </Button>
      </div>

      <MobileHeader isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}

function Links() {
  const { t } = useTranslation();
  return (
    <ul className='hidden gap-8 lg:flex lg:flex-1 lg:justify-center '>
      {HOMEPAGE_ROUTES.map((route) => (
        <NavLink key={route.label} to={route.path} className='group'>
          <li className='relative flex items-center gap-3 text-sm text-text-secondary transition-all duration-300 hover:font-semibold hover:text-text-primary group-[.active]:font-semibold group-[.active]:text-text-primary '>
            <span>{t(`header.navbar.${route.label}`)}</span>
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
