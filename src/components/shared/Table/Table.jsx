import { useAutoAnimate } from '@formkit/auto-animate/react';
import { cloneElement, useRef } from 'react';
import { Sort } from './Sort';
import { useTable } from '.';
import { CheckBox, Status } from '@/components/ui/';
import { useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';

export function Table({ actions, canView }) {
  const { columns, rows, error, selected, onSelect, isLoading } = useTable();
  const table = useRef();
  const [parent] = useAutoAnimate({ duration: 300 });

  const checked = rows?.length > 0 && rows?.map((r) => r.profile_id || r.id).every((id) => selected.includes(id));

  if (error) return <Status status='error' message={error?.message} />;

  return (
    <div className='relative flex-1 overflow-x-auto' ref={table}>
      {rows?.length === 0 && <Status status='noResults' heading='No results found' />}
      <table cellPadding={3} className='w-full overflow-x-auto whitespace-nowrap  text-left'>
        <Skeleton table={table} />
        <thead className='bg-background-secondary z-10 sticky top-0'>
          <tr ref={parent}>
            {isLoading || (
              <Select
                checked={checked}
                onChange={() => rows?.forEach((r) => onSelect(r.profile_id || r.id, !checked))}
              />
            )}
            {columns
              .filter((c) => c.visible)
              .map((column) => (
                <Column key={column.displayLabel} column={column} />
              ))}
            {actions && <Column hide={true} />}
          </tr>
        </thead>
        <tbody className='h-fit divide-y divide-border text-sm font-medium text-text-primary' ref={parent}>
          {rows?.map((row) => (
            <Row
              key={row.id}
              row={row}
              visibleColumns={columns.filter((c) => c.visible)}
              actions={actions}
              canView={canView}
              selected={selected.includes(row.profile_id || row.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Column({ column, hide }) {
  return (
    <th scope='col' className='p-2 '>
      {hide ? <span className='sr-only '>Actions</span> : <Sort column={column} />}
    </th>
  );
}
function Row({ row, visibleColumns, actions, canView = true, selected }) {
  const { disabled, onSelect, isSelecting } = useTable();
  const navigate = useNavigateWithQuery();
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <tr
      ref={parent}
      className={`transition-colors duration-200 ${selected ? 'bg-background-tertiary' : 'hover:bg-background-disabled'}
      ${canView || isSelecting ? 'cursor-pointer' : ''}
      `}
      onClick={() => {
        isSelecting && onSelect(row.profile_id || row.id)
        canView && !disabled && navigate(row.id);
      }}
    >
      <Select id={row.profile_id || row.id} />
      {visibleColumns.map((col) => (
        <td key={col.displayLabel} className='px-6 py-3.5'>
          {col.format ? col.format(row[col.key], row.id) : row[col.key]}
        </td>
      ))}
      {actions && <td className='grid place-items-end px-6 py-3.5'>{cloneElement(actions, { row })}</td>}
    </tr>
  );
}

function Select({ id, checked, onChange }) {
  const { selected, onSelect } = useTable();

  return (
    <td className='p-3 pr-0'>
      <CheckBox
        checked={checked !== undefined ? checked : selected.includes(id)}
        onChange={() => (onChange ? onChange() : onSelect(id))}
      />
    </td>
  );
}

function Skeleton({ table }) {
  const { columns, isLoading } = useTable();

  if (!isLoading) return null;

  const tableHeight = table.current?.getBoundingClientRect().height;
  const skeletonHeight = 40;
  const theadHeight = table.current?.querySelector('thead')?.getBoundingClientRect().height;

  const length = Math.floor((tableHeight - theadHeight) / skeletonHeight);
  return (
    <tbody>
      {Array.from({ length }).map((_, i) => (
        <tr className='animate-pulse' key={i}>
          {columns
            .filter((c) => c.visible)
            .map(({ displayLabel }) => (
              <td key={displayLabel}>
                <div className='rounded-md bg-background-secondary px-6 py-4'></div>
              </td>
            ))}
          <td>
            <div className='rounded-md bg-background-secondary px-6 py-4'></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
