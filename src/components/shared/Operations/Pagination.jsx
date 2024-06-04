import { useOperations } from './useOperations';
import { Pagination as P } from '../Pagination';


export function Pagination({onlyButtons,name}) {
  const { totalItems, totalPages, page, limit, onChangeLimit, onPaginate, disabled } = useOperations();

  return <P {...{ totalItems, totalPages, page, limit, onChangeLimit, onPaginate, disabled,onlyButtons,name }} />;
}