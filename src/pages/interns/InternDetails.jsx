import { Heading } from '@/components/Heading';
import { Link, useParams } from 'react-router-dom';
import { useIntern } from '../../features/interns/useInterns';
import { Button } from '@/components/ui';
import { IoChevronBack } from 'react-icons/io5';

export function InternDetails() {
  const { id } = useParams();
  const { intern, isLoading, error } = useIntern(id);
  const { firstName, lastName, email, phone, birthday, major, university, startDate, endDate } = intern || {};

  const render = () => {
    if (isLoading) return <Heading>Loading...</Heading>;
    if (error) return <Heading>{error.message}</Heading>;
    if (!intern) return <Heading>Project not found</Heading>;

    return (
      <div className="">
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <p>{birthday}</p>
        <p>{major}</p>
        <p>{university}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>
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
      <Heading>InternDetails</Heading>
      {render()}
    </>
  );
}
