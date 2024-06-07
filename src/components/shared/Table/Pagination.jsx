import { useTable } from './useTable';
import { Pagination as P } from '../Pagination';

export function Pagination() {
  const { totalItems, totalPages, page, limit, onChangeLimit, onPaginate, disabled } = useTable();

  return (
    <P
      {...{
        totalItems,
        totalPages,
        page,
        limit,
        onChangeLimit,
        onPaginate,
        disabled,
        className: 'px-6 mt-auto pb-2',
      }}
    />
  );
}
