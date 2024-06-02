import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Operations } from '@/components/shared/Operations/Operations';
import { useOperations } from '@/components/shared/Operations/useOperations';
import { Status } from '@/components/ui/Status';
import Offer from './Offer';
import OffersSkeleton from './OffersSkeleton';
import { New } from '../projects/ProjectsList';
import { useNavigate } from 'react-router-dom';

export default function OffersList({ filter, onHomePage }) {
  const { data: offers, isLoading, error, layout, appliedFiltersNumber, query } = useOperations();
  const [parent] = useAutoAnimate({ duration: 500 });
  const navigate = useNavigate();

  const render = () => {
    if (isLoading) return <OffersSkeleton layout={layout} />;
    if (error) return <Status status='error' heading={error.message} message='Please try again later' />;
    if (offers?.length === 0 && (query || appliedFiltersNumber('all')))
      return (
        <Status status='noResults' heading='No offers found' message='Try changing your search query or filters' />
      );
    return offers?.map((offer) => <Offer key={offer.id} offer={offer} layout={layout} />);
  };

  return (
    <div className='flex flex-1 flex-col gap-5 overflow-hidden'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3 pt-2'>
          <Operations.DropDown>
            <Operations.SortBy />
            <Operations.OrderBy />
          </Operations.DropDown>
          {filter || <Operations.Filter />}
        </div>
        <Operations.Layout />
      </div>

      <div
        className={`scroll flex-1 gap-5 overflow-auto p-1 pr-2 ${
          layout === 'grid' && !isLoading
            ? 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] place-content-start sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]'
            : 'flex flex-col'
        }`}
        ref={parent}
      >
        {!appliedFiltersNumber('all') && !query && !onHomePage && !error && !isLoading && (
          <New type='Offer' layout={layout} onAdd={() => navigate('/app/offers/new')} />
        )}
        {render()}
        <div className='col-span-full'>
          <Operations.ViewMore color='tertiary' />
        </div>
      </div>
    </div>
  );
}
