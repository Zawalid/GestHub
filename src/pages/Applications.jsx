import { Heading } from '@/components/Heading';
import ApplicationReview from '@/features/applications/ApplicationReview';
import ApplicationsList from '@/features/applications/ApplicationsList';

export function Applications() {
  return (
    <>
      <Heading>Applications</Heading>
      <ApplicationsList />
      <ApplicationReview source='app' />
    </>
  );
}
