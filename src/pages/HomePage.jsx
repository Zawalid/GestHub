import { useVisibleOffers } from '@/features/offers/useOffers';
import { useEffect,  } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Operations } from '../components/shared/Operations/Operations';
import { getOffersProps } from '@/pages/Offers';
import { changeTitle, getIntervals } from '@/utils/helpers';
import { useSettings, useUser } from '@/hooks/useUser';
import Applications from '@/features/applications/Applications';
import ApplicationReview from '@/features/applications/ApplicationReview';
import OfferOverview from '@/features/offers/OfferOverview';
import Offers from '@/components/homepage/Offers';
import Hero from '@/components/homepage/Hero';

export function HomePage() {
  const { settings } = useSettings();
  const { user } = useUser();
  const { offers, isLoading, error } = useVisibleOffers();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    changeTitle(settings?.appName);
  }, [settings?.appName]);

  return (
    <>
      <Operations
        {...getOffersProps(offers, isLoading, error)}
        filters={{
          sector: [...new Set(offers?.map((offer) => offer.sector))].map((s) => ({
            value: s,
            checked: searchParams.get('sector') === s,
          })),
          city: [...new Set(offers?.map((offer) => offer.city))].map((s) => ({
            value: s,
            checked: searchParams.get('city') === s,
          })),
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
        <Offers />
      </Operations>
      <OfferOverview onHomePage={true} />

      {user?.role === 'user' && (
        <>
          <Applications />
          <ApplicationReview />
        </>
      )}
    </>
  );
}
