import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Operations } from '@/components/shared/operations/Operations';
import { useOperations } from '@/components/shared/operations/useOperations';
import { Status } from '@/components/ui/Status';
import Offer from './Offer';
import OffersSkeleton from './OffersSkeleton';

// eslint-disable-next-line react-refresh/only-export-components
export const renderOffersList = ({ offers, isLoading, error, layout, query, appliedFiltersNumber }) => {
  if (isLoading) return <OffersSkeleton layout={layout} />;
  if (error) return <Status status='error' heading={error.message} message='Please try again later' />;
  if (offers?.length === 0 && (query || appliedFiltersNumber))
    return <Status status='noResults' heading='No offers found' message='Try changing your search query or filters' />;
  return (
    <>
      {offers?.map((offer) => (
        <Offer key={offer.id} offer={offer} />
      ))}
    </>
  );
};

export default function OffersList({ hideFilter }) {
  const { data: offers, isLoading, error, layout, appliedFiltersNumber, query } = useOperations();
  const [parent] = useAutoAnimate({ duration: 500 });

  return (
    <div className='flex flex-1 overflow-hidden flex-col gap-5'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3 pt-2'>
          <Operations.DropDown>
            <Operations.SortBy />
            <Operations.OrderBy />
          </Operations.DropDown>
          <Operations.Filter className={hideFilter && 'md:hidden'} />
        </div>
        <Operations.Layout />
      </div>

      <div
        className={`flex-1 gap-5 overflow-auto p-1 pr-2 ${
          layout === 'grid' ? 'grid content-start grid-cols-[repeat(auto-fill,minmax(350px,1fr))]' : 'flex flex-wrap'
        }`}
        ref={parent}
      >
        {renderOffersList({ offers, isLoading, error, layout, appliedFiltersNumber, query })}
      </div>
    </div>
  );
}
