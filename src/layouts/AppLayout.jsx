import { Outlet } from 'react-router';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';


export default function AppLayout() {
  const [parent] = useAutoAnimate({ duration: 400, easing: 'ease-in-out' });

  return (
    <div className='flex w-full overflow-x-hidden overflow-y-auto h-full flex-col'>
      <Header />
      <main className='flex-1 pt-10 p-2 md:p-10' ref={parent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}