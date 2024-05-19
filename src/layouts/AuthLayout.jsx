import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui';
import { Logo } from '@/components/ui/Logo';
import { useUser } from '@/hooks/useUser';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useEffect } from 'react';
import { BiHome } from 'react-icons/bi';
import { Outlet, useNavigate } from 'react-router-dom';

export function AuthLayout() {
  const { isLoading, user } = useUser();
  const [parent] = useAutoAnimate({ duration: 300 });
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) navigate(user?.role === 'user' ? '/' : '/app');
  }, [isLoading, user, navigate]);

  return (
    <div className='grid h-full w-full grid-cols-1 md:grid-cols-2'>
      <div className='relative hidden items-center justify-center bg-gradient-to-b from-background-tertiary to-background-secondary md:flex'>
        <Logo to={null} className='w-2/3' />
      </div>
      <div ref={parent} className=' flex h-full w-full flex-col p-2 md:h-screen md:overflow-auto md:p-0 '>
        <div>
          <div className='mb-5 flex w-full justify-between  gap-4 p-2 md:p-3'>
            <Button onClick={() => navigate('/')} shape='icon'>
              <BiHome />
            </Button>
            <div className='right-0 flex gap-4 '>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
