import { useState } from 'react';
import OffersList from '@/features/offers/OffersList';
import { useVisibleOffers } from '@/features/offers/useOffers';
import { useOperations } from '../shared/Operations/useOperations';
import { Button, CheckBox, DropDown, ToolTip } from '../ui';
import {
  GoLink,
  GoUnlink,
  GrPowerReset,
  IoChevronDownOutline,
  IoFilter,
  TbLayoutNavbarExpandFilled,
  TbLayoutBottombarExpandFilled,
} from '@/components/ui/Icons';
import { useTranslation } from 'react-i18next';

export default function Offers() {
  return (
    <div className='flex h-screen flex-shrink-0 gap-6 overflow-hidden p-5 sm:p-8' id='offers'>
      <Filters hide={true} />
      <OffersList filter={<MobileFilters />} onHomePage={true} />
    </div>
  );
}

function Filters({ hide }) {
  const { offers } = useVisibleOffers();
  const { filters, onFilter, filterCondition, appliedFiltersNumber, onChangeFilterCondition } = useOperations();
  const getExpanded = (value) => Object.keys(filters).reduce((acc, key) => ({ ...acc, [key]: value }), {});
  const [expanded, setExpanded] = useState(() => getExpanded(false));

  return (
    <div className={`h-full min-w-[280px] flex-col gap-3 overflow-hidden pt-2 ${hide ? 'hidden lg:flex' : 'flex'}`}>
      <div className='flex items-center justify-between border-b-2 border-border pb-2'>
        <h3 className='text-lg font-semibold text-text-primary'>Advanced Filter</h3>
        <div className='flex items-center gap-1.5'>
          <Button
            size='small'
            shape='icon'
            onClick={() => setExpanded((prev) => getExpanded(!Object.keys(prev).every((key) => prev[key])))}
          >
            {Object.keys(expanded).every((key) => expanded[key]) ? 
            <TbLayoutBottombarExpandFilled /> :
            <TbLayoutNavbarExpandFilled />
        }
          </Button>
          {Object.keys(filters).length > 1 && (
            <ToolTip content={`Toggle filter condition (currently ${filterCondition})`}>
              <Button size='small' shape='icon' onClick={onChangeFilterCondition}>
                {filterCondition === 'OR' ? <GoLink /> : <GoUnlink />}
              </Button>
            </ToolTip>
          )}
          <Button
            size='small'
            shape='icon'
            onClick={() => onFilter(null, null, true)}
            disabled={appliedFiltersNumber('all') === 0}
          >
            <GrPowerReset />
          </Button>
        </div>
      </div>
      <div className={`flex flex-1 flex-col gap-3 divide-y divide-border overflow-auto ${hide ? 'pr-3' : ''}`}>
        {Object.keys(filters).map((key) => (
          <div className={`flex flex-col pt-2 first:pt-0 ${expanded[key] ? 'gap-2' : ''}`} key={key}>
            <Button
              display='with-icon'
              type='transparent'
              className='w-full justify-between hover:bg-background-secondary'
              onClick={() => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))}
            >
              <h4 className='relative font-medium capitalize text-text-tertiary'>
                {key.replace(/([A-Z])/g, ' $1')}
                <span
                  className={`absolute -right-6 -top-2 h-5 w-5 rounded-full bg-primary text-center text-xs font-bold leading-5 text-white transition-transform duration-300 ${
                    appliedFiltersNumber(key) > 0 ? 'scale-100' : 'scale-0'
                  }`}
                >
                  {appliedFiltersNumber(key)}
                </span>
              </h4>
              <IoChevronDownOutline
                className={`transition-transform duration-300 ${expanded[key] ? 'rotate-180' : 'rotate-0'}`}
              />
            </Button>
            {filters[key]?.map(({ value, checked }) => (
              <div
                key={value?.value || value}
                className={`space-y-4 overflow-hidden px-3 ${expanded[key] ? 'h-auto' : 'h-0'}`}
              >
                <div className='flex items-center gap-3 text-sm'>
                  <CheckBox checked={checked} onChange={() => onFilter(key, value)} />
                  <span className='flex-1 font-medium text-text-secondary'>{value?.value || value}</span>
                  <span className='count text-xs'>
                    {offers?.filter((o) => (value.value ? value.condition(o) : value === o[key])).length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileFilters() {
  const { appliedFiltersNumber, disabled } = useOperations();
  const { t } = useTranslation();

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
      togglerClassName='relative w-28 lg:hidden justify-between'
      togglerDisabled={disabled}
    >
      <Filters />
    </DropDown>
  );
}
