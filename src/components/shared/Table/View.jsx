import { useTable } from './useTable';
import { BsTable, BsListCheck } from 'react-icons/bs';
import { Button, CheckBox, DropDown } from '../../ui';

export function View() {
  const { columns, onChangeView, data, isLoading, disabled } = useTable();

  if (!isLoading && data?.length === 0) return null;

  return (
    <DropDown
      toggler={
        <Button shape='icon'>
          <BsTable />
        </Button>
      }
      options={{ className: 'max-h-[300px] overflow-auto', shouldCloseOnClick: false }}
      togglerDisabled={disabled}
    >
      <DropDown.Option
        onClick={() => onChangeView(null, true)}
        disabled={columns.filter((c) => c.visible).length === columns.length}
      >
        <BsListCheck />
        Check All
      </DropDown.Option>
      <DropDown.Divider />

      {columns.map(({ displayLabel, visible }) => {
        const disabled = visible && columns.filter((c) => c.visible).length === 1;

        return (
          <DropDown.Option key={displayLabel} className='justify-between' disabled={disabled}>
            {displayLabel}
            <CheckBox checked={visible} onChange={() => onChangeView(displayLabel)} disabled={disabled} />
          </DropDown.Option>
        );
      })}
    </DropDown>
  );
}
