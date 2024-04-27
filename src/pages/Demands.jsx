import { Heading } from '@/components/Heading';
import DemandReview from '@/features/demands/DemandReview';
import DemandsList from '@/features/demands/DemandsList';

export function Demands() {
  return (
    <>
      <Heading>Demands</Heading>
      <DemandsList />
      <DemandReview />
    </>
  );
}
