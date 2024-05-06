import { IoFilter, GoLink, GoUnlink , GrPowerReset } from '@/components/ui/Icons';
import { Button, CheckBox, DropDown, ToolTip } from '@/components/ui';
import { useOperations } from './useOperations';
import { useTranslation } from 'react-i18next';

const toggleChecked = (filter, value) => filter.map((f) => (f.value === value ? { ...f, checked: !f.checked } : f));

export function Filter({ className = '' }) {
  const { filters, onFilter, filterCondition, onChangeFilterCondition, appliedFiltersNumber, isLoading, error } =
    useOperations();
  const { t } = useTranslation();
  if (!filters) return null;

  return (
    <DropDown
      toggler={
        <Button display='with-icon' color='tertiary'>
          {t('actions.filter')}
          <IoFilter />
          <span
            className={`absolute -right-2 -top-2 h-5 w-5 rounded-full bg-primary text-center text-xs font-bold leading-5 text-white transition-transform duration-300 ${
              appliedFiltersNumber > 0 ? 'scale-100' : 'scale-0'
            }`}
          >
            {appliedFiltersNumber}
          </span>
        </Button>
      }
      options={{
        className: 'min-w-[180px] max-h-[300px] overflow-y-auto',
        shouldCloseOnClick: false,
      }}
      togglerClassName={`relative w-28 justify-between ${className}`}
      togglerDisabled={isLoading || error}
    >
      {Object.keys(filters).map((key) => (
        <div key={key} className='space-y-1'>
          <DropDown.Title className='capitalize'>{key}</DropDown.Title>
          {filters[key].map(({ value, checked }) => (
            <DropDown.Option key={value?.value || value} className='justify-between capitalize'>
              {value?.value || value}
              <CheckBox checked={checked} onChange={() => onFilter({ [key]: toggleChecked(filters[key], value) })} />
            </DropDown.Option>
          ))}

          <DropDown.Divider key={`${key}-divider`} />
        </div>
      ))}
      <div className='flex items-center gap-1.5'>
        <DropDown.Option key='reset' onClick={() => onFilter(null, true)} disabled={appliedFiltersNumber === 0}>
          <GrPowerReset />
          Reset Filters
        </DropDown.Option>
        <ToolTip content={`Toggle filter condition (currently ${filterCondition})`}>
          <Button shape='icon' onClick={onChangeFilterCondition}>
            {filterCondition === 'OR' ? <GoLink /> : <GoUnlink  />}
          </Button>
        </ToolTip>
      </div>
    </DropDown>
  );
}
