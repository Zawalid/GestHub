import { Footer } from '@/components/homepage/Footer';
import { Header } from '@/components/homepage/Header';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  const [parent] = useAutoAnimate({ duration: 300 });
  return (
    <div className=' flex h-screen flex-col justify-between'>
      <Header />
      {/* <div className="z-10 self-start absolute right-0 flex w-full justify-between  p-3 gap-4">
        <Button size={"large"} onClick={() => navigate("/")} shape="icon">
          <BiHome />
        </Button>
        <div className="  flex gap-4 right-0 ">
          <LanguageSwitcher size={"large"} />
          <ThemeSwitcher size={"large"} />
        </div>
      </div> */}

      <div ref={parent} className=' flex h-full w-full p-5 pb-10 md:p-0'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

