import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useUser } from '@/hooks/useUser';

export default function AppBar() {
  return (
    <div className='flex items-center  justify-between gap-8 px-6 py-3'>
      <UserInfo />
      <div className='flex gap-3'>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
}

function UserInfo() {
  const { user } = useUser();

  return (
    <div className='flex items-center gap-3'>
      <img
        className='h-8 w-8 rounded-full border-2 border-border object-cover text-center text-xs text-text-tertiary '
        src={user?.avatar || '/images/default-profile.jpg'}
        alt='profile image'
      />
      <div>
        <h3 className='text-sm font-medium text-text-primary'>{user?.fullName}</h3>
        <h4 className='text-xs capitalize text-text-tertiary'>{user?.role}</h4>
      </div>
    </div>
  );
}
