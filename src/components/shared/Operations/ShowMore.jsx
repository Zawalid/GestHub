import { Button } from '@/components/ui';
import { useOperations } from './useOperations';

export function ShowMore({ props }) {
  const { page, totalPages, onPaginate } = useOperations();

  return (
    <Button
      color='secondary'
      {...props}
      onClick={() => {
        if (page === totalPages) return onPaginate(1);
        onPaginate(page + 1);
      }}
    >
      {page === totalPages ? 'Show Less' : 'Show More'}
    </Button>
  );
}
