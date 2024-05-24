import { Button } from '@/components/ui';
import { useOperations } from './useOperations';

export function ViewMore({ ...props }) {
  const { page, totalPages, onPaginate } = useOperations();

  const onClick = (e) => {
    if (page === totalPages) {
      onPaginate(1);
      e.target?.parentElement?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onPaginate(page + 1);
  };

  if (totalPages === 1) return null;

  return (
    <Button color='secondary' className='mx-auto w-full' {...props} onClick={onClick}>
      {page === totalPages ? 'View Less' : 'View More'}
    </Button>
  );
}
