import { Button } from '@/components/ui';
import { useOperations } from './useOperations';

export function ViewMore({ props }) {
  const { page, totalPages, onPaginate } = useOperations();

  return (
    <Button
      color='secondary'
      className='w-fit mx-auto'
      {...props}
      onClick={() => {
        if (page === totalPages) return onPaginate(1);
        onPaginate(page + 1);
      }}
    >
      {page === totalPages ? 'View Less' : 'View More'}
    </Button>
  );
}
