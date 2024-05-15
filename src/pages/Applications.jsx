import { Heading } from '@/components/Heading';
import ApplicationReview from '@/features/applications/ApplicationReview';
import ApplicationsList from '@/features/applications/ApplicationsList';
import { useApplications } from '../hooks';

export function Applications() {
  const { applications } = useApplications();

  return (
    <>
      <Heading count={applications?.length}>Applications</Heading>
      <ApplicationsList />
      <ApplicationReview />
    </>
  );
}
