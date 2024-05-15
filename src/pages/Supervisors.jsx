import { Heading } from '@/components/Heading';
import SupervisorsList from '@/features/supervisors/SupervisorsList';
import { useSupervisors } from '../hooks';

export function Supervisors() {
  const { supervisors } = useSupervisors();

  return (
    <>
      <Heading count={supervisors?.length}>Supervisors</Heading>
      <SupervisorsList />
    </>
  );
}
