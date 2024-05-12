import { Button, DropDown } from './ui';
import { FaUserAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks';
import { useLogout } from '@/hooks/useUser';
import { FiLogOut } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { LuClipboardList } from 'react-icons/lu';
import Avatar from './ui/Avatar';

export function AuthSwitcher({ size }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { user } = useUser();

  if (user) return <User user={user} />;

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

function User({ user }) {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <DropDown
      toggler={<Avatar />}
      options={{
        className: 'min-w-[200px]',
      }}
    >
      <DropDown.Title>
        <div className='flex gap-3 py-2'>
          <Avatar />
          <div className='grid'>
            <span className=''>{user?.fullName}</span>
            <span className='text-xs font-medium text-text-secondary'>{user?.email}</span>
          </div>
        </div>
      </DropDown.Title>
      <DropDown.Divider />
      {user?.role === 'user' ? (
        <DropDown.Option onClick={() => navigate('/applications')}>
          <LuClipboardList />
          My Applications
        </DropDown.Option>
      ) : (
        <DropDown.Option onClick={() => navigate('/app')}>
          <RxDashboard />
          {t(`header.auth.dashboard`)}
        </DropDown.Option>
      )}
      <DropDown.Option onClick={logout}>
        <FiLogOut />
        {t(`header.auth.logout`)}
      </DropDown.Option>
    </DropDown>
  );
}
