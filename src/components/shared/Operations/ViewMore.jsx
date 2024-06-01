import { Button } from '@/components/ui';
import { useOperations } from './useOperations';

export function ViewMore({ ...props }) {
  const { page, totalPages, onPaginate,disabled,data } = useOperations();

  const onClick = () => {
    if (page === totalPages) {
      onPaginate(1);
      document.querySelector('.scroll').scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onPaginate(page + 1);
  };

  if (totalPages === 1 || disabled || !data.length) return null;

  return (
    <Button color='tertiary' size='small' {...props} onClick={onClick} className={`mx-auto ${props.className || ''}`}>
      {page === totalPages ? 'View Less' : 'View More'}
    </Button>
  );
}
