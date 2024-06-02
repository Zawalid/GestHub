import { IoFilter, GoLink, GoUnlink, GrPowerReset } from '@/components/ui/Icons';
import { Button, CheckBox, DropDown, ToolTip } from '@/components/ui';
import { useOperations } from './useOperations';
import { useTranslation } from 'react-i18next';

export function Filter({ className = '' }) {
  const {
    filters,
    onFilter,
    filterCondition,
    onChangeFilterCondition,
    appliedFiltersNumber,
    disabled,
  } = useOperations();
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
              appliedFiltersNumber('all') > 0 ? 'scale-100' : 'scale-0'
            }`}
          >
            {appliedFiltersNumber('all')}
          </span>
        </Button>
      }
      options={{
        className: 'min-w-[180px] max-h-[325px] overflow-y-auto',
        shouldCloseOnClick: false,
      }}
      togglerClassName={`relative w-28 justify-between ${className}`}
      togglerDisabled={disabled}
    >
      {Object.keys(filters).map((key) => (
        <div key={key} className='space-y-1'>
          <DropDown.Title className='capitalize'>{key}</DropDown.Title>
          {(filters[key]).map(({ value, checked }) => (
            <DropDown.Option key={value?.value || value} className='justify-between capitalize'>
              {value?.value || value}
              <CheckBox checked={checked} onChange={() => onFilter(key, value)} />
            </DropDown.Option>
          ))}

          <DropDown.Divider key={`${key}-divider`} />
        </div>
      ))}
      <div className='flex items-center gap-1.5'>
        <DropDown.Option key='reset' onClick={() => onFilter(null, null, true)} disabled={appliedFiltersNumber('all') === 0}>
          <GrPowerReset />
          Reset Filters
        </DropDown.Option>
        {Object.keys(filters).length > 1 && (
          <ToolTip content={`Toggle filter condition (currently ${filterCondition})`}>
            <Button shape='icon' onClick={onChangeFilterCondition}>
              {filterCondition === 'OR' ? <GoLink /> : <GoUnlink />}
            </Button>
          </ToolTip>
        )}
      </div>
    </DropDown>
  );
}
