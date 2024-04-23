import { Footer } from '@/components/homepage/Footer';
import { Header } from '@/components/homepage/Header';
import { Outlet } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export function HomePageLayout() {
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <div ref={parent} className='flex h-full w-full flex-col overflow-auto'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
