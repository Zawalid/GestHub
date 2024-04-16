import About from '@/components/homepage/About';
import Hero from '@/components/homepage/Hero';
import { Operations } from '@/components/shared/operations/Operations';
import { useOfferContext } from '@/features/offers';
import Offers from '@/features/offers/Offers';

export function HomePage() {
    const {
    error,
    isLoading,
    filtredoffers: offers,
  } = useOfferContext();
  return (
    <>
      <Hero />
        <Operations
        data={offers}
        isLoading={isLoading}
        error={error}
        sortOptions={[
          { key: 'title', display: 'Name', type: 'string' },
          { key: 'startDate', display: 'Start Date', type: 'date' },
          { key: 'endDate', display: 'End Date', type: 'date' },
          { key: 'tasksNumber', display: 'Tasks Number', type: 'number' },
          { key: 'membersNumber', display: 'Members Number', type: 'number' },
          { key: 'progress', display: 'Progress', type: 'number' },
        ]}
        defaultSortBy='startDate'
        defaultDirection='asc'
        filters={{
          secteur: [
            { value: 'devloppemnt', checked: false },
            { value: 'devops', checked: false },
            { value: 'Testing', checked: false },
            { value: 'Ui/Ux', checked: false },
          ],
          experience: [
            { value: 'Expert', checked: false },
            { value: 'intermediate', checked: false },
            { value: 'Debutant', checked: false },
          ],
        }}
        defaultLayout='grid'
        fieldsToSearch={['title']}
        >
          
      <Offers  />
    </Operations>
      <About />
    </>
  );
}
