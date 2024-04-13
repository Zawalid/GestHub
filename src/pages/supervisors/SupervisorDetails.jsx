import { Heading } from '@/components/Heading';
import { Link, useParams } from 'react-router-dom';
import { useSupervisor } from '../../features/supervisors/useSupervisors';
import { Button } from '@/components/ui';
import { IoChevronBack } from 'react-icons/io5';

export  function SupervisorDetails() {
  const { id } = useParams();
  const { supervisor, isLoading, error } = useSupervisor(id);
  const { firstName, lastName, email, phone, department } = supervisor || {};

  const render = () => {
    if (isLoading) return <Heading>Loading...</Heading>;
    if (error) return <Heading>{error}</Heading>;
    if (!supervisor) return <Heading>Project not found</Heading>;

    return (
      <div className="">
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
      <Link to="/app/supervisors" replace={true}>
        <Button color="tertiary" display="with-icon" size="small">
          <IoChevronBack />
          Back
        </Button>
      </Link>

      <Heading>SupervisorDetails</Heading>
      {render()}
    </>
  );
}
