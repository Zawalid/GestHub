import { Heading } from '@/components/Heading';
import SessionsList from '@/features/sessions/SessionsList';
import { useSessions } from '../hooks';

export function Sessions() {
  const { sessions } = useSessions();

  return (
    <>
      <Heading count={sessions?.length}>Sessions</Heading>
      <SessionsList />
    </>
  );
}
