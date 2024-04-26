import { Button, DropDown } from './ui';
import { FaUserAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import {  NavLink, useLocation } from 'react-router-dom';
import { useUser } from '../hooks';

export function AuthSwitcher({ size }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { user } = useUser();

  if (user)
    return (
      <img
        className='h-8 w-8 rounded-full border-2 border-border object-cover text-center text-xs text-text-tertiary '
        src={user?.avatar?.src || '/images/default-profile.jpg'}
        alt='profile image'
      />
    );

  return (
    <DropDown
      toggler={
        <Button size={size} shape='icon'>
          <FaUserAlt />
        </Button>
      }
    >
      {['login', 'register'].map((e) => (
        <NavLink to={`/${e}`} key={e}>
          <DropDown.Option className={`${pathname.includes(e) && 'bg-primary'}`}>
            {t(`header.auth.${e}`)}
          </DropDown.Option>
        </NavLink>
      ))}
    </DropDown>
  );
}
