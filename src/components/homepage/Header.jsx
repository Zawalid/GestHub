import { useEffect, useState } from 'react';
import { NavLink, useHref } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaChevronDown } from 'react-icons/fa6';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MobileHeader } from './MobileHeader';
import { AuthSwitcher } from '../AuthSwitcher';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Button } from '../ui';
import { Logo } from '../ui/logo';
import Shade from '../ui/shade';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPath = useHref().split('/')[1];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  return (
    <header className=' bg-background- flex items-center justify-between border-b border-border  p-5 pt-2 shadow-md shadow-md '>
      <Logo className='w-20' />
      <Links />

      <div className='flex items-center gap-4'>
        <ThemeSwitcher />
        <LanguageSwitcher />
        <AuthSwitcher />

        <Button shape='icon' onClick={() => setIsMobileMenuOpen(true)} className='lg:hidden'>
          <RxHamburgerMenu />
        </Button>
      </div>

      <MobileHeader isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* <Shade className='absolute left-0 top-16 z-10 w-full overflow-hidden leading-[0]' /> */}
    </header>
  );
}

function Links() {
  const { t } = useTranslation();
  return (
    <ul className='hidden gap-8 lg:flex lg:flex-1 lg:justify-center '>
      {[
        { label: 'home', path: '/' },
        { label: 'offers', path: '/offers' },
        { label: 'about', path: '#about' },
      ].map((route) => (
        <NavLink key={route.label} to={route.path} className='group'>
          <li className='relative flex items-center gap-3 text-sm text-text-secondary transition-all duration-300 hover:font-semibold hover:text-text-primary group-[.active]:font-semibold group-[.active]:text-text-primary '>
            <span>{t(`header.navbar.${route.label}`)}</span>
            {route.nested && <FaChevronDown />}
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
