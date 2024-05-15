import { Heading } from '@/components/Heading';
import AdminsList from '@/features/admins/AdminsList';
import { useAdmins } from '../hooks';

export function Admins() {
  const { admins } = useAdmins();

  return (
    <>
      <Heading count={admins?.length}>Admins</Heading>
      <AdminsList />
    </>
  );
}
