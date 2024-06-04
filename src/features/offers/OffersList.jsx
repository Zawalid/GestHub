import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Operations, renderData } from '@/components/shared/Operations/Operations';
import { useOperations } from '@/components/shared/Operations/useOperations';
import Offer from './Offer';
import OffersSkeleton from './OffersSkeleton';
import { New } from '../projects/ProjectsList';
import { useNavigate } from 'react-router-dom';

export default function OffersList({ filter, onHomePage }) {
  const { data: offers, isLoading, error, layout, appliedFiltersNumber, query, page, totalPages } = useOperations();
  const [parent] = useAutoAnimate({ duration: 500 });
  const navigate = useNavigate();

  return (
    <div className='flex flex-1 flex-col gap-5 overflow-hidden'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-3 pt-2'>
          <Operations.Sort />
          {filter || <Operations.Filter />}
        </div>
        <Operations.Layout />
      </div>

      <div
        className={`scroll relative flex-1 gap-5 overflow-auto p-1 pr-2 ${
          layout === 'grid' && !isLoading
            ? 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] place-content-start sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]'
            : 'flex flex-col'
        }`}
        ref={parent}
      >
        {!appliedFiltersNumber('all') && !query && !onHomePage && !error && !isLoading && (
          <New type='Offer' layout={layout} onAdd={() => navigate('/app/offers/new')} />
        )}
        {renderData({
          isLoading,
          error,
          page,
          query,
          appliedFiltersNumber,
          totalPages,
          data: offers,
          skeleton: <OffersSkeleton layout={layout} />,
          render: () => offers?.map((offer) => <Offer key={offer.id} offer={offer} layout={layout} />),
        })}
      </div>
      <Operations.Pagination name='offers' />
    </div>
  );
}
