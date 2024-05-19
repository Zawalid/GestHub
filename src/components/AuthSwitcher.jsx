import { DropDown } from './ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks';
import { useLogout } from '@/hooks/useUser';
import { FiLogOut, FiUserPlus } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';
import { LuClipboardList } from 'react-icons/lu';
import Avatar from './ui/Avatar';

export function AuthSwitcher() {
  const { t } = useTranslation();
  const { logout } = useLogout();
  const navigate = useNavigate();
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
        </>
      ) : (
        <>
          <DropDown.Option onClick={() => navigate('/login')}>
            <FiLogOut />
            Log In
          </DropDown.Option>
          <DropDown.Option onClick={() => navigate('/register')}>
            <FiUserPlus />
            Create Account
          </DropDown.Option>
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
