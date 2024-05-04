import { IoArrowUpOutline, IoArrowDownOutline,  FaSort } from '@/components/ui/Icons';

import { Button,  } from '@/components/ui';
import { useTable } from '.';

const icons = {
  asc: <IoArrowUpOutline />,
  desc: <IoArrowDownOutline />,
};

export function Sort({ column }) {
  const { sortBy, direction, onSort} = useTable();
  const sort = (dir) => onSort(column.key, dir);

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
// <DropDown
//   toggler={
//   }
//   options={{  className: "w-28 text-xs" }}
// >
//   <DropDown.Option onClick={() => sort("asc")}>
//     {icons.asc}
//     Asc
//   </DropDown.Option>
//   <DropDown.Option onClick={() => sort("desc")}>
//     {icons.desc}
//     Desc
//   </DropDown.Option>
//   {columns.filter((c) => c.visible).length === 1 || (
//     <>
//       <DropDown.Divider />
//       <DropDown.Option onClick={() => onChangeView(column.displayLabel)}>
//         <IoEyeOffOutline />
//         Hide
//       </DropDown.Option>
//     </>
//   )}
// </DropDown>
