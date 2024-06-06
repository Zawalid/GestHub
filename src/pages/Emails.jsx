import { Heading } from '@/components/Heading';
import Email from '@/features/emails/Email';
import EmailsList from '@/features/emails/EmailsList';
import { useEmails } from '@/features/emails/useEmails';

export function Emails() {
  const { emails } = useEmails();

  return (
    <>
      <Heading count={emails?.length}>Emails</Heading>
      <EmailsList />
      <Email />
    </>
  );
}
