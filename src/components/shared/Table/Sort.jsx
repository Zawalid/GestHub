import { IoArrowUpOutline, IoArrowDownOutline, FaSort } from '@/components/ui/Icons';
import { Button, CheckBox, DropDown } from '@/components/ui';
import { useTable } from './useTable';

const icons = {
  asc: <IoArrowUpOutline />,
  desc: <IoArrowDownOutline />,
};

export function Sort({ column }) {
  const { sortBy, direction, onSort, onFilter, filters, appliedFiltersNumber } = useTable();
  const sort = (dir) => onSort(column.key, dir);

  if (column.filter)
    return (
      <DropDown
        toggler={
          <Button
            color='tertiary'
            type='transparent'
            display='with-icon'
            onClick={() => sort(direction === 'asc' ? 'desc' : 'asc')}
          >
            {column.displayLabel}
            {sortBy === column.key ? icons[direction] : <FaSort size={12} />}
            <span
              className={`absolute -right-2 -top-2 h-5 w-5 rounded-full bg-primary text-center text-xs font-bold leading-5 text-white transition-transform duration-300 ${
                appliedFiltersNumber(column.key) > 0 ? 'scale-100' : 'scale-0'
              }`}
            >
              {appliedFiltersNumber(column.key)}
            </span>
          </Button>
        }
        options={{
          className: 'min-w-[150px] max-h-[250px] overflow-y-auto',
          shouldCloseOnClick: false,
        }}
        togglerClassName='relative'
      >
        <DropDown.Option onClick={() => sort('asc')}>
          {icons.asc}
          Asc
        </DropDown.Option>
        <DropDown.Option onClick={() => sort('desc')}>
          {icons.desc}
          Desc
        </DropDown.Option>
        <DropDown.Divider />
        {filters[column.key]?.map(({ value, checked }) => (
          <DropDown.Option key={value?.value || value} className='justify-between capitalize'>
            {value?.value || value}
            <CheckBox checked={checked} onChange={() => onFilter(column.key, value)} />
          </DropDown.Option>
        ))}
      </DropDown>
    );

  return (
    <Button
      color='tertiary'
      type='transparent'
      display='with-icon'
      onClick={() => sort(direction === 'asc' ? 'desc' : 'asc')}
    >
      {column.displayLabel}
      {sortBy === column.key ? icons[direction] : <FaSort size={12} />}
    </Button>
  );
}
