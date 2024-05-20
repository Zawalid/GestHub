import { NavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { PiX } from 'react-icons/pi';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { LoggedUser } from '../AuthSwitcher';
import { Button } from '../ui';
import { Overlay } from '../ui/Modal';
import { SocialMedia } from '../ui/SocialMedia';
import { useLogout, useUser } from '@/hooks/useUser';

export function MobileHeader({ isOpen, onClose }) {
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <>
      <Overlay isOpen={isOpen} onClose={onClose} closeOnBlur={true} />
      <div
        className={
          'fixed right-0 top-0 z-40  flex h-full w-full flex-col gap-5 justify-self-end overflow-auto bg-background-primary transition-transform duration-500 sm:w-[360px] ' +
          (isOpen ? 'translate-x-0' : 'translate-x-full')
        }
      >
        <div className='flex items-center justify-between gap-3 px-5 pt-5'>
          {user && <LoggedUser user={user} />}
          <div className='ml-auto flex gap-2'>
            {user && (
              <Button onClick={logout} shape='icon'>
                <FiLogOut />
              </Button>
            )}
            <Button onClick={onClose} shape='icon'>
              <PiX />
            </Button>
          </div>
        </div>

        <ul className='flex flex-1 flex-col items-center justify-center gap-6'>
          {[
            { label: 'home', path: '/' },
            { label: 'offers', path: '/offers' },
            { label: 'about', path: '#about' },
            ...(user?.role === 'user' ? [{ label: 'Applications', path: '/applications' }] : []),
            ...(user && user?.role !== 'user' ? [{ label: 'Dashboard', path: '/app' }] : []),
          ].map(({ label, path }) => (
            <NavLink key={label} to={path} className=' mobile_header'>
              <li className=' text-2xl font-semibold capitalize text-text-primary transition-all duration-300 hover:scale-110 hover:text-text-secondary sm:text-xl'>
                {label}
              </li>
            </NavLink>
          ))}

          {!user && (
            <ul className='mt-4 flex flex-col items-center gap-2 border-t-2 border-border pt-6'>
              {[
                { label: 'Log In', path: '/login' },
                { label: 'Create Account', path: '/register' },
              ].map(({ label, path }) => (
                <li key={label} className='font-medium text-text-secondary'>
                  <NavLink to={path}>{label}</NavLink>
                </li>
              ))}
            </ul>
          )}
        </ul>

        <div className='mx-auto grid w-fit grid-cols-2 items-center justify-center gap-2 p-3'>
          <ThemeSwitcher size='small' layout='long' />
          <LanguageSwitcher size='small' layout='long' />
        </div>

        <SocialMedia />
      </div>
    </>
  );
}
