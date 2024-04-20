import { useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FaPlus } from 'react-icons/fa6';
import { Operations } from '@/components/shared/operations/Operations';
import { useOperations } from '@/components/shared/operations/useOperations';
import { Button } from '@/components/ui';
import { Status } from '@/components/ui/Status';
// import OffersSkeleton from './OffersSkeleton';
// import Offer from './Offer';
import { useUser } from '@/hooks/useUser';

export default function OffersList() {
  const { data: offers, isLoading, error, layout, appliedFiltersNumber, query } = useOperations();
  const {user} = useUser();
  const navigate = useNavigate();
  const [parent] = useAutoAnimate({ duration: 500 });

  const onAdd = () => navigate('/app/offers/new');

//   const render = () => {
//     // if (isLoading) return <OffersSkeleton layout={layout} />;
//     if (error) return <Status status='error' heading={error.message} message='Please try again later' />;
//     if (offers.length === 0 && !query && !appliedFiltersNumber) {
//       return (
//         <div className='absolute grid h-full w-full place-content-center place-items-center gap-5'>
//           <img src='/SVG/offers.svg' alt='' className='w-[200px]' />
//           <div className='space-y-2 text-center'>
//             <h2 className='font-medium text-text-primary'> It appears there are currently no offers available</h2>
//             <p className='text-sm text-text-secondary'>Start by creating a new one.</p>{' '}
//           </div>
//           <Button onClick={onAdd}>New Offer</Button>
//         </div>
//       );
//     }
//     if (offers.length === 0 && (query || appliedFiltersNumber))
//       return (
//         <Status status='noResults' heading='No offers found' message='Try changing your search query or filters' />
//       );
//     return (
//       <>
//         {!appliedFiltersNumber && !query && user?.role === 'supervisor' && <NewOffer layout={layout} onAdd={onAdd} />}
//         {offers?.map((offer) => (
//           <Offer key={offer.id} offer={offer} layout={layout} />
//         ))}
//       </>
//     );
//   };

  return (
    <div className='flex h-full flex-col gap-5'>
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
          layout === 'grid'
            ? 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]'
            : 'flex flex-col'
        }`}
        ref={parent}
      >
        {/* {render()} */}
      </div>
    </div>
  );
}

function NewOffer({ layout, onAdd }) {
  return (
    <Button
      color='tertiary'
      className={`group flex items-center justify-center rounded-lg   border  border-border bg-background-disabled p-3 shadow-md ${
        layout === 'grid' ? 'h-[240px] flex-col gap-2' : 'w- h-20 gap-4'
      }`}
      onClick={onAdd}
    >
      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary p-1 text-text-tertiary hover:bg-background-tertiary group-hover:bg-background-tertiary'>
        <FaPlus />
      </div>
      <h3 className='font-semibold text-text-primary'>Add New Offer</h3>
    </Button>
  );
}
