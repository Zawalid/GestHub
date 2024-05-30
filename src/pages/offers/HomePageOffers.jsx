import { Operations } from '@/components/shared/Operations/Operations';
import { getOffersProps } from './Offers';
import { useVisibleOffers } from '@/features/offers/useOffers';
import OffersList from '@/features/offers/OffersList';
import OfferOverview from '@/features/offers/OfferOverview';
import { useEffect, useState } from 'react';
import { changeTitle } from '@/utils/helpers';
import NewApplication from '@/features/applications/NewApplication';
import { useUser } from '@/hooks/useUser';
import { useTranslation } from 'react-i18next';

export function HomePageOffers() {
  const [isApplying, setIsApplying] = useState();
  const { offers, isLoading, error, favorites, onToggleFavorite } = useVisibleOffers();
  const { user } = useUser();
  const { t } = useTranslation();

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
    <div className='flex flex-col gap-6 p-3 md:p-5'>
      <Operations {...getProps()}>
        <div className='flex flex-col justify-between gap-3 mobile:flex-row mobile:items-center'>
          <h1 className='text-3xl font-bold text-text-primary'>{t('offers.internshipOffers')}</h1>
          <Operations.Search />
        </div>
        <div className='flex min-h-screen flex-col'>
          <OffersList hideFilter={false} onHomePage={true} />
        </div>
      </Operations>
      <OfferOverview
        onHomePage={true}
        isFavorite={(id) => favorites?.includes(id)}
        onToggleFavorite={onToggleFavorite}
        onApply={() => setIsApplying(true)}
      />
      {user?.role === 'user' && <NewApplication isOpen={isApplying} onClose={() => setIsApplying(false)} />}
    </div>
  );
}
