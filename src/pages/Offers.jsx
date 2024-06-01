import { Heading } from '@/components/Heading';
import { Operations } from '@/components/shared/Operations/Operations';
import { useOffers } from '@/features/offers/useOffers';
import OffersList from '@/features/offers/OffersList';
import NewOffer from '@/features/offers/NewOffer';
import OfferOverview from '@/features/offers/OfferOverview';
import { getIntervals } from '@/utils/helpers';

// eslint-disable-next-line react-refresh/only-export-components
export const getOffersProps = (offers, isLoading, error) => ({
  data: offers,
  isLoading: isLoading,
  error: error,
  sortOptions: [
    { key: 'title', display: 'Title', type: 'string' },
    { key: 'duration', display: 'Duration', type: 'number' },
    { key: 'created_at', display: 'Publication Date', type: 'date' },
    { key: 'updated_at', display: 'Update Date', type: 'date' },
    {
      key: 'urgency',
      fn(a, b, direction) {
        if (a.status === b.status) return 0;
        return direction === 'desc' ? (a.status === 'Urgent' ? -1 : 1) : a.status === 'Urgent' ? 1 : -1;
      },
      display: 'Urgency',
      type: 'custom',
    },
    {
      key: 'experience',
      fn(a, b, direction) {
        const experiences = { Expert: 2, Intermediate: 1, Beginner: 0 };
        return direction === 'asc'
          ? experiences[a?.experience] - experiences[b?.experience]
          : experiences[b?.experience] - experiences[a?.experience];
      },
      display: 'Experience',
      type: 'custom',
    },
  ],
  defaultSortBy: 'publicationDate',
  defaultDirection: 'desc',
  filters: {
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
    visibility: [
      { value: 'Visible', checked: false },
      { value: 'Hidden', checked: false },
    ],
    status: [{ value: 'Urgent', checked: false }],
  },
  defaultLayout: 'grid',
  fieldsToSearch: ['title', 'sector'],
});

export function Offers() {
  const { offers, isLoading, error } = useOffers();

  return (
    <Operations {...getOffersProps(offers, isLoading, error)}>
      <div className='flex flex-col justify-between gap-3 mobile:flex-row mobile:items-center'>
        <Heading count={offers?.length}>Offers</Heading>
        <Operations.Search />
      </div>
      <OffersList />
      <NewOffer />
      <OfferOverview />
    </Operations>
  );
}
