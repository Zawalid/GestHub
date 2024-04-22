import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Operations } from '@/components/shared/operations/Operations';
import { useOperations } from '@/components/shared/operations/useOperations';
import { Status } from '@/components/ui/Status';
import Offer from './Offer';
import OffersSkeleton from './OffersSkeleton';

export default function OffersList() {
  const { data: offers, isLoading, error, layout, appliedFiltersNumber, query } = useOperations();
  const [parent] = useAutoAnimate({ duration: 500 });

  const render = () => {
    if (isLoading) return <OffersSkeleton layout={layout} />
    if (error) return <Status status='error' heading={error.message} message='Please try again later' />;
    if (offers.length === 0 && (query || appliedFiltersNumber))
      return (
        <Status status='noResults' heading='No offers found' message='Try changing your search query or filters' />
      );
    return (
      <>
        {offers?.map((offer) => (
          <Offer key={offer.id} offer={offer} />
        ))}
      </>
    );
  };

  return (
    <div className='flex flex-1 flex-col gap-5'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3'>
          <Operations.DropDown>
            <Operations.SortBy />
            <Operations.OrderBy />
          </Operations.DropDown>
          <Operations.Filter />
        </div>
        <Operations.Layout />
      </div>

      <div
        className={`h-full gap-5 ${
          layout === 'grid' ? 'grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))]' : 'flex flex-wrap'
        }`}
        ref={parent}
      >
        {render()}
      </div>
    </div>
  );
}
