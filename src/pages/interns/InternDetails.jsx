import { Heading } from '@/components/Heading';
import { useParams } from 'react-router-dom';
import { useIntern } from '../../features/interns/useInterns';
import { BackButton } from '@/components/ui';
import { useEffect } from 'react';
import { changeTitle } from '@/utils/helpers';

export function InternDetails() {
  const { id } = useParams();
  const { intern, isLoading, error } = useIntern(id);
  const {fullName, email, phone, academicLevel, establishment, startDate, endDate } = intern || {};

  useEffect(() => {
    changeTitle(fullName);
  }, [fullName]);

  const render = () => {
    if (isLoading) return <Heading>Loading...</Heading>;
    if (error) return <Heading>{error.message}</Heading>;
    if (!intern) return <Heading>Project not found</Heading>;

    return (
      <div className=''>
        <p>{fullName}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <p>{academicLevel}</p>
        <p>{establishment}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>
      </div>
    );
  };

  return (
    <>
      <BackButton />
      <Heading>InternDetails</Heading>
      {render()}
    </>
  );
}
