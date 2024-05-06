import { Heading } from '@/components/Heading';
import { Operations } from '@/components/shared/operations/Operations';
import DemandReview from '@/features/demands/DemandReview';
import DemandsList from '@/features/demands/DemandsList';
import { useDemands } from '@/features/demands/useDemands';

export function Demands() {
  const { demands, isLoading, error } = useDemands();

  return (
    <>
      <Heading>Demands</Heading>
      <Operations
        data={demands}
        isLoading={isLoading}
        error={error}
        filters={{
          status: [
            { value: 'Pending', checked: false },
            { value: 'Approved', checked: false },
            { value: 'Rejected', checked: false },
          ],
          sector: [...new Set(demands?.map((demand) => demand.sector))].map((s) => ({ value: s, checked: false })),
        }}
      >
        <DemandsList />
      </Operations>
      <DemandReview closeUrl='/app/demands' />
    </>
  );
}
