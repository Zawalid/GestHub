import About from '@/components/homepage/About';
import Hero from '@/components/homepage/Hero';
import { renderOffersList } from '@/features/offers/OffersList';
import {  useVisibleOffers } from '@/features/offers/useOffers';
import { Button } from '@/components/ui';
import { MdOutlineExplore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { changeTitle } from '@/utils/helpers';

export function HomePage() {
  useEffect(() => {
    changeTitle('MenStage');
  }, []);

  return (
    <>
      <Hero />
      <LatestOffers />
      <About />
    </>
  );
}

function LatestOffers() {
  const { offers, isLoading, error } = useVisibleOffers(true);
  const navigate = useNavigate();

  return (
    <div className='relative my-12 flex  flex-col gap-8 p-3 md:p-5'>
      <h1 className='text-3xl font-bold text-text-primary'>Recent Internship Offers</h1>

      <div
        className={`relative flex-1 gap-5  ${!isLoading ? 'grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] ' : ''}
        ${error ? 'min-h-screen' : ''}`}
      >
        {renderOffersList({ offers, isLoading, error, layout: 'grid' })}
        {!isLoading && !error && (
          <Button
            color='tertiary'
            className='h- group flex items-center justify-center gap-4  rounded-lg border border-border bg-background-disabled p-3 shadow-md  md:flex-col md:gap-2'
            onClick={() => navigate('/offers')}
          >
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary p-1 text-text-tertiary hover:bg-background-tertiary group-hover:bg-background-tertiary'>
              <MdOutlineExplore size={20} />
            </div>
            <h3 className='font-semibold text-text-primary'>Explore More Offers</h3>
          </Button>
        )}
      </div>
    </div>
  );
}
