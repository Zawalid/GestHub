import { Heading } from '@/components/Heading';
import { Operations } from '@/components/shared/operations/Operations';
// import NewOffer from '@/features/offers/NewOffer/NewOffer';
import OffersList from '@/features/offers/OffersList';
import { useOffers } from '@/features/offers/useOffers';
import { useUser } from '@/hooks/useUser';

export function Offers() {
  const { offers, isLoading, error } = useOffers();
  const { user } = useUser();

  return (
    <Operations
      data={offers}
      isLoading={isLoading}
      error={error}
      sortOptions={[
        { key: 'title', display: 'Title', type: 'string' },
        { key: 'duration', display: 'Duration', type: 'number' },
        { key: 'publicationDate', display: 'Publication Date', type: 'date' },
      ]}
      defaultSortBy='publicationDate'
      defaultDirection='asc'
      filters={{
        experience: [
          { value: 'Expert', checked: false },
          { value: 'Intermediate', checked: false },
          { value: 'Beginner', checked: false },
        ],
        status: [
          { value: 'Low', checked: false },
          { value: 'Medium', checked: false },
          { value: 'High', checked: false },
        ],
      }}
      defaultLayout='grid'
      fieldsToSearch={['title']}
    >
      <div className='flex flex-col justify-between gap-3 mobile:flex-row mobile:items-center'>
        <Heading>Offers</Heading>
        <Operations.Search />
      </div>
      <OffersList />
      {/* {user?.role === 'supervisor' && <NewOffer />} */}
    </Operations>
  );
}
