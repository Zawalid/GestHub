import { Heading } from '@/components/Heading';
import { Operations } from '@/components/shared/operations/Operations';
import { useOffers } from '@/features/offers/useOffers';
import OffersList from '@/features/offers/OffersList';
import { Button } from '@/components/ui';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NewOffer from '@/features/offers/NewOffer';

export function Offers() {
  const { offers, isLoading, error } = useOffers();
  const navigate = useNavigate();

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
        type: [
          { value: 'Onsite', checked: false },
          { value: 'Hybrid', checked: false },
          { value: 'Remote', checked: false },
        ],
        visibility: [
          { value: 'Visible', checked: false },
          { value: 'Hidden', checked: false },
        ],
        status: [{ value: 'Urgent', checked: false }],
      }}
      defaultLayout='grid'
      fieldsToSearch={['title']}
    >
      <div className='flex flex-col justify-between gap-3 mobile:flex-row mobile:items-center'>
        <Heading>Offers</Heading>
        <div className='flex items-center gap-3'>
          <Operations.Search />
          <Button shape='icon' onClick={() => navigate('/app/offers/new')}>
            <FaPlus />
          </Button>
        </div>
      </div>
      <OffersList />
      <NewOffer />
    </Operations>
  );
}
