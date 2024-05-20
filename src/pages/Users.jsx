import { Heading } from '@/components/Heading';
import UsersList from '@/features/users/UsersList';
import { useUsers } from '../hooks';

export function Users() {
  const { users } = useUsers();

  return (
    <>
      <Heading count={users?.length}>Users</Heading>
      <UsersList />
    </>
  );
}
