import {
  IoFilter,
  GoLink,
  GoUnlink,
  GrPowerReset,
  IoChevronDownOutline,
  TbLayoutBottombarExpandFilled,
  TbLayoutNavbarExpandFilled,
} from '@/components/ui/Icons';
import { Button, CheckBox, DropDown, ToolTip } from '@/components/ui';
import { useOperations } from './useOperations';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

// export function Filter({ className = '' }) {
//   const {
//     filters,
//     onFilter,
//     filterCondition,
//     onChangeFilterCondition,
//     appliedFiltersNumber,
//     disabled,
//   } = useOperations();
//   const { t } = useTranslation();

//   if (!filters) return null;

//   return (
//     <DropDown
//       toggler={
//         <Button display='with-icon' color='tertiary'>
//           {t('actions.filter')}
//           <IoFilter />
//           <span
//             className={`absolute -right-2 -top-2 h-5 w-5 rounded-full bg-primary text-center text-xs font-bold leading-5 text-white transition-transform duration-300 ${
//               appliedFiltersNumber('all') > 0 ? 'scale-100' : 'scale-0'
//             }`}
//           >
//             {appliedFiltersNumber('all')}
//           </span>
//         </Button>
//       }
//       options={{
//         className: 'min-w-[180px] max-h-[325px] overflow-y-auto',
//         shouldCloseOnClick: false,
//       }}
//       togglerClassName={`relative w-28 justify-between ${className}`}
//       togglerDisabled={disabled}
//     >
//       {Object.keys(filters).map((key) => (
//         <div key={key} className='space-y-1'>
//           <DropDown.Title className='capitalize'>{key}</DropDown.Title>
//           {(filters[key]).map(({ value, checked }) => (
//             <DropDown.Option key={value?.value || value} className='justify-between capitalize'>
//               {value?.value || value}
//               <CheckBox checked={checked} onChange={() => onFilter(key, value)} />
//             </DropDown.Option>
//           ))}

//           <DropDown.Divider key={`${key}-divider`} />
//         </div>
//       ))}
//       <div className='flex items-center gap-1.5'>
//         <DropDown.Option key='reset' onClick={() => onFilter(null, null, true)} disabled={appliedFiltersNumber('all') === 0}>
//           <GrPowerReset />
//           Reset Filters
//         </DropDown.Option>
//         {Object.keys(filters).length > 1 && (
//           <ToolTip content={`Toggle filter condition (currently ${filterCondition})`}>
//             <Button shape='icon' onClick={onChangeFilterCondition}>
//               {filterCondition === 'OR' ? <GoLink /> : <GoUnlink />}
//             </Button>
//           </ToolTip>
//         )}
//       </div>
//     </DropDown>
//   );
// }

export function Filter({ isInDropDown, className, title }) {
  const { appliedFiltersNumber, disabled } = useOperations();

  if (isInDropDown) return <Filters {...{ className, title }} />;

  return (
    <DropDown
      toggler={
        <Button shape='icon' color='tertiary'>
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
        className: 'min-w-[180px] max-h-[330px] overflow-auto',
        shouldCloseOnClick: false,
        placement: 'bottom-start',
      }}
      togglerClassName='relative'
      togglerDisabled={disabled}
    >
      <Filters {...{ className, title }} />
    </DropDown>
  );
}

const getExpanded = (filters, value) => Object.keys(filters).reduce((acc, key) => ({ ...acc, [key]: value }), {});

function Filters({ isInDropDown = true, className = '', title }) {
  const { initialData, filters, onFilter, filterCondition, appliedFiltersNumber, onChangeFilterCondition } =
    useOperations();
  const [expanded, setExpanded] = useState(() => getExpanded(filters, Object.keys(filters).length === 1));
  const { t } = useTranslation();

  return (
    <div className={`flex h-full min-w-[220px] flex-col  overflow-hidden ${className}`}>
      <div className='flex items-center justify-between gap-5 border-b-2 border-border pb-2'>
        <h3 className='pl-3 text-lg font-semibold text-text-primary'>{title || t('actions.filter')}</h3>
        <div className='flex items-center gap-1.5'>
          <Button
            size='small'
            shape='icon'
            onClick={() => setExpanded((prev) => getExpanded(filters, !Object.keys(prev).every((key) => prev[key])))}
          >
            {Object.keys(expanded).every((key) => expanded[key]) ? (
              <TbLayoutBottombarExpandFilled />
            ) : (
              <TbLayoutNavbarExpandFilled />
            )}
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
      <div className={`flex flex-1 flex-col gap-2 divide-y divide-border overflow-auto ${isInDropDown ? '' : 'pr-3'}`}>
        {Object.keys(filters).map((key) => (
          <div className={`flex flex-col pt-2  ${expanded[key] ? 'gap-2' : ''}`} key={key}>
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
                    {initialData?.filter((o) => (value.value ? value.condition(o) : value === o[key])).length}
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
