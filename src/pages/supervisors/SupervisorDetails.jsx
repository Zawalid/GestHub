import { Heading } from '@/components/Heading';
import { useParams } from 'react-router-dom';
import { useSupervisor } from '../../features/supervisors/useSupervisors';
import { BackButton } from '@/components/ui';
import { useEffect } from 'react';
import { changeTitle } from '@/utils/helpers';

export function SupervisorDetails() {
  const { id } = useParams();
  const { supervisor, isLoading, error } = useSupervisor(id);
  const { firstName, lastName, email, phone, department } = supervisor || {};

  useEffect(() => {
    changeTitle(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  const render = () => {
    if (isLoading) return <Heading>Loading...</Heading>;
    if (error) return <Heading>{error.message}</Heading>;
    if (!supervisor) return <Heading>Project not found</Heading>;

    return (
      <div className=''>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <p>{department}</p>
      </div>
    );
  };

  return (
    <>
      <BackButton />
      <Heading>SupervisorDetails</Heading>
      {render()}
    </>
  );
}
