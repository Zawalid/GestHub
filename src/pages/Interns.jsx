import { Heading } from '@/components/Heading';
import Intern from '@/features/interns/Intern';
import InternsList from '@/features/interns/InternsList';
import { useInterns } from '../hooks';

export function Interns() {
  const { interns } = useInterns();

  return (
    <>
      <Heading count={interns?.length}>Interns</Heading>
      <InternsList />
      <Intern />
    </>
  );
}
