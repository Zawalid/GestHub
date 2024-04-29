import { Heading } from '@/components/Heading';
import Intern from '@/features/interns/Intern';
import InternsList from '@/features/interns/InternsList';

export function Interns() {
  return (
    <>
      <Heading>Interns</Heading>
      <InternsList />
      <Intern />
    </>
  );
}
