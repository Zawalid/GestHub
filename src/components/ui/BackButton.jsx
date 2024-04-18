import { useNavigate } from 'react-router-dom';
import { Button } from '.';
import { IoChevronBack } from 'react-icons/io5';

export function BackButton({to}) {
  const navigate = useNavigate();

  return (
    <Button color='tertiary' display='with-icon' size='small' className='w-fit' onClick={() => navigate(to || -1)}>
      <IoChevronBack />
      Back
    </Button>
  );
}
