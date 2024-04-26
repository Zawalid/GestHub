import { Operations } from '@/components/shared/operations/Operations';
import { getOffersProps } from './Offers';
import { useOffers } from '@/features/offers/useOffers';
import OffersList from '@/features/offers/OffersList';
import OfferOverview from '@/features/offers/OfferOverview';
import { useEffect } from 'react';
import { changeTitle } from '@/utils/helpers';

export function HomePageOffers() {
  const { offers, isLoading, error, favorites, onToggleFavorite } = useOffers(true);

  useEffect(() => {
    changeTitle('Offers');
  }, []);

  const getProps = () => {
    const {
      // eslint-disable-next-line no-unused-vars
      filters: { visibility, ...restFilters },
      ...restProps
    } = getOffersProps(offers, isLoading, error);
    const newStatus = [
      ...restFilters.status,
      { value: { value: 'Favorite', condition: (offer) => offer.isFavorite }, checked: false },
    ];

    return { ...restProps, filters: { ...restFilters, status: newStatus } };
  };

  return (
    <div className='flex max-h-[150dvh]  flex-col gap-6 p-3 md:p-5'>
      <Operations {...getProps()}>
        <div className='flex flex-col justify-between gap-3 mobile:flex-row mobile:items-center'>
          <h1 className='text-3xl font-bold text-text-primary'>Internship Offers</h1>
          <Operations.Search />
        </div>
        <div className='flex h-screen flex-col'>
          <OffersList hideFilter={false} />
        </div>
      </Operations>
      <OfferOverview
        onHomePage={true}
        isFavorite={(id) => favorites.includes(id)}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}
