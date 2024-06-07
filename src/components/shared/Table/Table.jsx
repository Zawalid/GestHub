import { useAutoAnimate } from '@formkit/auto-animate/react';
import { cloneElement, useRef } from 'react';
import { Sort } from './Sort';
import { useTable } from './useTable';
import { CheckBox, Status } from '@/components/ui/';
import { useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';

export function Table({ actions, canView, hideRowActions, hiddenActionsContent }) {
  const { columns, rows, error, selected, onSelect, isLoading, query, appliedFiltersNumber, data } = useTable();
  const table = useRef();
  const [parent] = useAutoAnimate({ duration: 500 });

  const checked =
    rows?.length > 0 &&
    rows
      ?.filter((row) => !hideRowActions?.(row))
      .map((r) => r.profile_id || r.id)
      .every((id) => selected.includes(id));

  if (error) return <Status status='error' message={error?.message} />;
  if (!isLoading && rows?.length === 0 && !query && !appliedFiltersNumber('all')) {
    return (
      <div className='absolute grid h-full w-full place-content-center place-items-center gap-5 pt-5'>
        <img src='/SVG/no-applications.svg' alt='' className='w-[100px]' />
        <div className='space-y-2 text-center'>
          <h2 className='font-medium text-text-primary'>
            {data?.length === 0 ? 'No Data Available' : 'Page Not Found'}{' '}
          </h2>
          <p className='text-sm text-text-secondary'>
            {data?.length === 0
              ? 'There are currently no records to display in this table.'
              : 'The page you&apos;re trying to access doesn&apos;t exist.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='relative flex-1 overflow-x-auto' ref={table}>
      {rows?.length === 0 && !isLoading && (
        <Status status='noResults' heading='No results found' message='Try changing your search query or filters' />
      )}
      <table cellPadding={3} className='w-full overflow-x-auto whitespace-nowrap text-left'>
        <Skeleton table={table} />
        <thead className='sticky top-0 z-10 bg-background-secondary'>
          <tr ref={parent}>
            {/* All Checkbox  visibility*/}
            {isLoading || !actions || rows?.every((row) => hideRowActions?.(row)) || (
              <Select
                checked={checked}
                onChange={() =>
                  rows?.filter((row) => !hideRowActions?.(row)).forEach((r) => onSelect(r.profile_id || r.id, !checked))
                }
              />
            )}
            {rows?.every((row) => hideRowActions?.(row)) && actions && <Column hide={true} />}
            {columns
              .filter((c) => c.visible)
              .map((column) => (
                <Column key={column.displayLabel} column={column} />
              ))}

            {(actions || hiddenActionsContent) && <Column hide={true} />}
          </tr>
        </thead>
        <tbody className='h-fit divide-y divide-border text-sm font-medium text-text-primary' ref={parent}>
          {rows?.map((row) => (
            <Row
              key={row.id}
              row={row}
              visibleColumns={columns.filter((c) => c.visible)}
              actions={actions}
              hideRowActions={hideRowActions?.(row)}
              hiddenActionsContent={hiddenActionsContent?.(row)}
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

function Row({ row, visibleColumns, actions, canView = true, selected, hideRowActions, hiddenActionsContent }) {
  const { disabled, onSelect, isSelecting } = useTable();
  const navigate = useNavigateWithQuery();
  const [parent] = useAutoAnimate({ duration: 500 });

  // Define the class names for the row
  const rowClassNames = [
    'transition-colors',
    'duration-200',
    selected ? 'bg-background-tertiary' : 'hover:bg-background-disabled',
    canView || isSelecting ? 'cursor-pointer' : '',
  ].join(' ');

  // Define the onClick handler for the row
  const handleRowClick = () => {
    if (isSelecting && !hideRowActions) {
      onSelect(row.profile_id || row.id);
    }
    if (canView && !disabled && !isSelecting) {
      navigate(row.id);
    }
  };

  return (
    <tr ref={parent} className={rowClassNames} onClick={handleRowClick}>
      {/* If actions are provided and not hidden, render a Select component */}
      {actions && !hideRowActions && <Select id={row.profile_id || row.id} />}
      {/* If actions are provided and hidden, render a hidden Column */}
      {actions && hideRowActions && <Column hide={true} />}

      {visibleColumns.map((col) => (
        <td key={col.displayLabel} className={`px-6 ${actions ? 'py-3.5' : 'py-5'}`}>
          {col.format ? col.format(row[col.key], row.id) : row[col.key]}
        </td>
      ))}

      {/* If actions are provided and not hidden, render a table data cell with the actions */}
      {actions && !hideRowActions && (
        <td className='grid place-items-end px-6 py-3.5'>{cloneElement(actions, { row })}</td>
      )}
      {/* If hidden actions content is provided, render a table data cell with the hidden actions content */}
      {hiddenActionsContent && <td className='grid place-items-end px-6 py-3.5'>{hiddenActionsContent}</td>}
      {/* If actions are provided and hidden, and no hidden actions content is provided, render a hidden Column */}
      {actions && hideRowActions && !hiddenActionsContent && <Column hide={true} />}
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
        <tr className='group animate-pulse' key={i}>
          {columns
            .filter((c) => c.visible)
            .map(({ displayLabel }) => (
              <td key={displayLabel}>
                <div className='rounded-md bg-background-secondary px-6 py-4 group-first:first:mt-0.5'></div>
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
