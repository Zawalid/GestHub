import { Heading } from '@/components/Heading';
import SessionsList from '@/features/sessions/SessionsList';
import { useSessions } from '../hooks';
import Session from '@/features/sessions/Session';

export function Sessions() {
  const { sessions } = useSessions();

  return (
    <>
      <Heading count={sessions?.length}>Sessions</Heading>
      <SessionsList />
      <Session />
    </>
  );
}
