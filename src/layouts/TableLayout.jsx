import { Table } from '@/components/shared/Table';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export  function TableLayout({ onAdd, onUpdate, onDelete, ...tableProps }) {
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <div className='flex h-full flex-col gap-5 overflow-auto'>
      <Table {...tableProps}>
        <div className='flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center'>
          <div className='flex items-center justify-between gap-3 sm:justify-normal'>
            <Table.Search />
            <Table.View />
          </div>
          <div className='flex items-center justify-between gap-3'>
            <Table.Download />
            <Table.NewRecord onAdd={onAdd} />
          </div>
        </div>
        <div
          className='relative flex flex-1 flex-col overflow-hidden rounded-lg border border-border shadow-md'
          ref={parent}
        >
          <Table.Table actions={<Table.Actions onUpdate={onUpdate} onDelete={onDelete} />} />
          <Table.TableRecord />
          <Table.Pagination />
        </div>
      </Table>
    </div>
  );
}
