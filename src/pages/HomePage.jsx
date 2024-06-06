import { useCities, useSectors, useVisibleOffers } from '@/features/offers/useOffers';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Operations } from '../components/shared/Operations/Operations';
import { getOffersProps } from '@/pages/Offers';
import { changeTitle, getIntervals } from '@/utils/helpers';
import { useSettings, useUser } from '@/hooks/useUser';
import Applications from '@/features/applications/Applications';
import ApplicationReview from '@/features/applications/ApplicationReview';
import OfferOverview from '@/features/offers/OfferOverview';
import Hero from '@/components/homepage/Hero';
import OffersList from '@/features/offers/OffersList';
import NewApplication from '@/features/applications/NewApplication';

export function HomePage() {
  const { settings } = useSettings();
  const { user } = useUser();
  const { sectors } = useSectors();
  const { cities } = useCities();
  const { offers, isLoading, error, favorites, onToggleFavorite } = useVisibleOffers();
  const [isApplying, setIsApplying] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    changeTitle(settings?.appName);
  }, [settings?.appName]);

  return (
    <>
      <Operations
        {...getOffersProps(offers, isLoading, error)}
        filters={{
          sector:
            sectors?.map((s) => ({
              value: s,
              checked: searchParams.get('sector') === s,
            })) || [],
          city:
            cities?.map((s) => ({
              value: s,
              checked: searchParams.get('city') === s,
            })) || [],
          experience: [
            { value: 'Expert', checked: false },
            { value: 'Intermediate', checked: false },
            { value: 'Beginner', checked: false },
          ],
          type: [
            { value: 'Onsite', checked: false },
            { value: 'Hybrid', checked: false },
            { value: 'Remote', checked: false },
          ],
          publicationDate: getIntervals('publicationDate', ['past', 'present']),
          status: [
            { value: 'Urgent', checked: false },
            { value: { value: 'Favorite', condition: (offer) => offer.isFavorite }, checked: false },
          ],
        }}
      >
        <Hero />
        <div className='flex h-screen flex-shrink-0 gap-6 overflow-hidden p-5 sm:p-8' id='offers'>
          <Operations.Filter isExpanded={true} className='hidden min-w-[285px] lg:flex' />
          <OffersList filter={<Operations.Filter togglerClassName='lg:hidden' />} onHomePage={true} />
        </div>
      </Operations>
      <OfferOverview
        onHomePage={true}
        onApply={() => setIsApplying(true)}
        isFavorite={(id) => favorites?.includes(id)}
        onToggleFavorite={onToggleFavorite}
      />

      {user?.role === 'user' && (
        <>
          <Applications />
          <ApplicationReview />
          <NewApplication isOpen={isApplying} onClose={() => setIsApplying(false)} />
        </>
      )}
    </>
  );
}
