import { useVisibleOffers } from '@/features/offers/useOffers';
import { useEffect, useState } from 'react';
import { Operations } from '../components/shared/Operations/Operations';
import { useOffersProps } from '@/pages/Offers';
import { changeTitle } from '@/utils/helpers';
import { useUser } from '@/hooks/useUser';
import Applications from '@/features/applications/Applications';
import ApplicationReview from '@/features/applications/ApplicationReview';
import OfferOverview from '@/features/offers/OfferOverview';
import Hero from '@/components/homepage/Hero';
import OffersList from '@/features/offers/OffersList';
import NewApplication from '@/features/applications/NewApplication';
import { useSettings } from '@/features/settings/useSettings';

export function HomePage() {
  const { settings } = useSettings();
  const { user } = useUser();
  const { offers, isLoading, error, favorites, onToggleFavorite } = useVisibleOffers();
  const [isApplying, setIsApplying] = useState(false);
  const props = useOffersProps(offers, isLoading, error);

  useEffect(() => {
    changeTitle(settings?.appName);
  }, [settings?.appName]);

  return (
    <>
      <Operations
        {...{
          ...props,
          filters: {
            ...props.filters,
            status: [
              { value: 'Urgent', checked: false },
              { value: { value: 'Favorite', condition: (offer) => offer.isFavorite }, checked: false },
            ],
          },
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
