import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Button } from '@/components/ui';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { BiHome } from 'react-icons/bi';
import { Outlet, useNavigate } from 'react-router-dom';

export function AuthLayout() {
  const [parent] = useAutoAnimate({ duration: 300 });
  const navigate = useNavigate();
  return (
    <div className=' grid h-full w-full  grid-cols-1 md:grid-cols-[1fr,1fr]'>
      <div className=' -background-primary relative hidden  h-screen items-center justify-center bg-gradient-to-l from-background-tertiary md:flex  '>
        <img src='/images/logo-MEN.png' className='w-2/3 ' alt='' />
      </div>
      <div ref={parent} className=' flex h-full w-full flex-col p-2 md:h-screen md:overflow-auto md:p-0 '>
        <div>
          <div className='  flex w-full justify-between  gap-4 p-2 md:p-3'>
            <Button onClick={() => navigate('/')} shape='icon'>
              <BiHome />
            </Button>
            <div className='  right-0 flex gap-4 '>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
          <div className='flex items-center justify-center md:hidden'>
            <img src='/images/logo-MEN.png' className='w-1/2' alt='' />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
