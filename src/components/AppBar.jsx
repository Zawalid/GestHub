import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useUser } from '@/hooks/useUser';
import Avatar from './ui/Avatar';

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
  const { fullName, role } = user || {};

  return (
    <div className='flex items-center gap-3'>
      <Avatar />
      <div>
        <h3 className='text-sm font-medium capitalize text-text-primary'>{fullName}</h3>
        <h4 className='text-xs capitalize text-text-tertiary'>{role?.replace('-', ' ')}</h4>
      </div>
    </div>
  );
}
