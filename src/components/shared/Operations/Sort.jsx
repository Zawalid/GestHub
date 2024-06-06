import { Button, DropDown } from '@/components/ui';
import { useOperations } from './useOperations';
import {
  PiCheckBold,
  MdOutlineSortByAlpha,
  IoChevronDownOutline,
  PiSortAscending,
  IoArrowUpOutline,
  IoArrowDownOutline,
} from '@/components/ui/Icons';
import { useState } from 'react';

export function Sort() {
  const { disabled, sortBy, onSort, sortOptions, direction, onOrder } = useOperations();
  const [expanded, setExpanded] = useState({ sortBy: true, orderBy: true });

  return (
    <DropDown
      toggler={
        <Button display='with-icon' type='outline' color='tertiary'>
          {direction === 'asc' ? <IoArrowUpOutline /> : <IoArrowDownOutline />}
          <span className='mr-3 text-start'>{sortOptions.find((s) => s.key === sortBy)?.display || 'Sort By'}</span>
          <IoChevronDownOutline className='text-base' />
        </Button>
      }
      options={{ placement: 'bottom-start', className: 'w-60 max-h-[330px] overflow-auto', shouldCloseOnClick: false }}
      togglerDisabled={disabled}
    >
      {[
        {
          type: 'sortBy',
          onClick: onSort,
          options: sortOptions,
        },
        {
          type: 'orderBy',
          onClick: onOrder,
          options: [
            {
              key: 'asc',
              display: 'Ascending',
            },
            {
              key: 'desc',
              display: 'Descending',
            },
          ],
        },
      ]
        .filter(({ options }) => options?.length > 1)
        .map(({ type, onClick, options }) => (
          <div key={type}>
            <Button
              display='with-icon'
              type='transparent'
              className='w-full justify-between hover:bg-background-secondary'
              onClick={() => setExpanded((prev) => ({ ...prev, [type]: !prev[type] }))}
            >
              {type === 'sortBy' ? (
                <PiSortAscending className='text-base' />
              ) : (
                <MdOutlineSortByAlpha className='text-base' />
              )}{' '}
              <span className='flex-1 text-start'>{type === 'sortBy' ? 'Sort By' : 'Order By'}</span>
              <IoChevronDownOutline
                className={`transition-transform duration-300 ${expanded[type] ? 'rotate-180' : 'rotate-0'}`}
              />
            </Button>
            <div className={`space-y-2 overflow-hidden px-2 ${expanded[type] ? 'h-auto' : 'h-0'}`}>
              {options.map(({ key, display }) => (
                <DropDown.Option
                  key={key}
                  onClick={() => onClick(key)}
                  className='justify-between'
                  isCurrent={(type === 'sortBy' ? sortBy : direction) === key}
                >
                  <span>{display}</span>
                  {(type === 'sortBy' ? sortBy : direction) === key && <PiCheckBold />}
                </DropDown.Option>
              ))}
            </div>
            <DropDown.Divider className='last:hidden' />
          </div>
        ))}
    </DropDown>
  );
}
