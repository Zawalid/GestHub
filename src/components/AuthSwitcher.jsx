import { DropDown } from './ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks';
import { useLogout } from '@/hooks/useUser';
import { FiLogOut, FiUserCheck } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { LuClipboardList } from 'react-icons/lu';
import Avatar from './ui/Avatar';

export function AuthSwitcher() {
  const { t } = useTranslation();
  const { logout } = useLogout();
  const { user } = useUser();

  return (
    <DropDown
      toggler={<Avatar />}
      options={{
        className: 'min-w-[200px]',
      }}
      togglerClassName='hidden lg:block'
    >
      {user ? (
        <>
          <DropDown.Title>
            <LoggedUser user={user} />
          </DropDown.Title>
          <DropDown.Divider />
          {user?.role === 'user' ? (
            <Link to='/applications'>
              <DropDown.Option>
                <LuClipboardList />
                My Applications
              </DropDown.Option>
            </Link>
          ) : (
            <Link to='/app'>
              <DropDown.Option>
                <RxDashboard />
                {t(`header.auth.dashboard`)}
              </DropDown.Option>
            </Link>
          )}
          <DropDown.Option onClick={logout}>
            <FiLogOut />
            {t(`header.auth.logout`)}
          </DropDown.Option>
        </>
      ) : (
        <>
          <Link to='/login'>
            <DropDown.Option>
              <FiLogOut />
              Log In
            </DropDown.Option>
          </Link>
          <Link to='/register'>
            <DropDown.Option>
              <FiUserCheck />
              Create Account
            </DropDown.Option>
          </Link>
        </>
      )}
    </DropDown>
  );
}

export function LoggedUser({ user }) {
  return (
    <div className='flex items-center gap-3 py-2'>
      <Avatar />
      <div className='grid'>
        <span className=''>{user?.fullName}</span>
        <span className='text-xs font-medium text-text-secondary'>{user?.email}</span>
      </div>
    </div>
  );
}
