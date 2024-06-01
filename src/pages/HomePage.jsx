import { useTranslation } from 'react-i18next';
import {
  GoLink,
  GoUnlink,
  GrPowerReset,
  IoBriefcaseOutline,
  IoChevronDownOutline,
  IoLocationOutline,
  IoSearchOutline,
} from '@/components/ui/Icons';
import { Button, CheckBox, DropDown, ToolTip } from '../components/ui';
import { useVisibleOffers } from '@/features/offers/useOffers';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Operations } from '../components/shared/Operations/Operations';
import { getOffersProps } from '@/pages/Offers';
import { changeTitle, getIntervals } from '@/utils/helpers';
import OffersList from '@/features/offers/OffersList';
import { useOperations } from '../components/shared/Operations/useOperations';
import { toggleChecked } from '../components/shared/Operations/Filter';
import { useSettings, useUser } from '@/hooks/useUser';
import Applications from '@/features/applications/Applications';
import ApplicationReview from '@/features/applications/ApplicationReview';
import OfferOverview from '@/features/offers/OfferOverview';

export function HomePage() {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const { user } = useUser();
  const { offers, isLoading, error } = useVisibleOffers();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    changeTitle(settings?.appName);
  }, [settings?.appName]);

  return (
    <>
      <Operations
        {...getOffersProps(offers, isLoading, error)}
        filters={{
          sector: [...new Set(offers?.map((offer) => offer.sector))].map((s) => ({
            value: s,
            checked: searchParams.get('sector') === s,
          })),
          city: [...new Set(offers?.map((offer) => offer.city))].map((s) => ({
            value: s,
            checked: searchParams.get('city') === s,
          })),
          experience: [
            { value: 'Expert', checked: false },
            { value: 'Intermediate', checked: false },
            { value: 'Beginner', checked: false },
          ],
          type: [
            { value: 'Onsite', checked: false },
            { value: 'Hybrid', checked: false },
            { value: 'Remote', checked: false },
          ],
          publicationDate: getIntervals('publicationDate', ['past', 'present']),
          status: [
            { value: 'Urgent', checked: false },
            { value: { value: 'Favorite', condition: (offer) => offer.isFavorite }, checked: false },
          ],
        }}
      >
        <div className='relative z-10 min-h-[500px] flex-shrink-0 p-5 sm:p-8'>
          <div className="h-full rounded-lg bg-background-secondary bg-[url('/SVG/Shape.svg')] bg-cover bg-center bg-no-repeat">
            <div className='flex h-full  w-full flex-col justify-center gap-8 rounded-lg p-8 backdrop-blur-sm  '>
              <div className='space-y-2 text-center'>
                <h1 className='text-2xl font-medium text-text-primary sm:text-3xl '>
                  {t('hero.title1')} <span className='font-extrabold text-primary'> {t('hero.title2')} </span>
                  {t('hero.title3')}
                </h1>
                <p className='text-sm font-medium text-text-secondary'>{t('hero.paragraph')}</p>
              </div>
              <Search />
            </div>
          </div>
        </div>
        <Offers />
      </Operations>
      <OfferOverview onHomePage={true} />

      {user?.role === 'user' && (
        <>
          <Applications />
          <ApplicationReview />
        </>
      )}
    </>
  );
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sector, setSector] = useState(searchParams.get('sector') || 'Sector');
  const [city, setCity] = useState(searchParams.get('city') || 'City');
  const { query, onSearch } = useOperations();

  return (
    <div className='flex flex-col gap-3 rounded-xl bg-background-primary p-2 shadow-md sm:gap-5 sm:p-4 md:flex-row md:items-center md:self-center'>
      <Filter icon={<IoBriefcaseOutline />} value={sector} setValue={setSector} field='sector' />
      <span className='hidden h-1/2 w-0.5 bg-border md:block'></span>
      <Filter icon={<IoLocationOutline />} value={city} setValue={setCity} field='city' />
      <span className='hidden h-1/2 w-0.5 bg-border md:block'></span>

      <div className='flex items-center gap-2 p-3'>
        <IoSearchOutline className='text-lg' />
        <input
          type='search'
          className='w-full border-b border-border bg-transparent pb-1.5 text-sm font-medium text-text-primary outline-none placeholder:text-text-tertiary'
          placeholder='Your keyword...'
          value={query}
          // onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className='grid grid-cols-2 gap-1.5'>
        <Button
          disabled={sector === 'Sector' && city === 'City' && !query}
          onClick={() => {
            sector !== 'Sector' && searchParams.set('sector', sector);
            city !== 'City' && searchParams.set('city', city);
            onSearch(query);
            setSearchParams(searchParams);
          }}
        >
          Search
        </Button>
        <Button
          color='tertiary'
          disabled={sector === 'Sector' && city === 'City' && !query}
          onClick={() => {
            setSector('Sector');
            setCity('City');
            onSearch('');
            setSearchParams({});
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

function Filter({ icon, value, setValue, field }) {
  const { offers } = useVisibleOffers();
  const [query, setQuery] = useState('');

  const results = [...new Set(offers?.map((offer) => offer[field]))].filter((e) =>
    e.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='flex items-center gap-2 text-text-tertiary'>
      <DropDown
        toggler={
          <Button display='with-icon' type='transparent'>
            {icon}
            <span className='flex-1 text-start text-sm font-medium text-text-primary'>{value}</span>
            <IoChevronDownOutline />
          </Button>
        }
        togglerClassName='w-full justify-between hover:bg-background-secondary'
        options={{
          className: 'overflow-auto w-[230px] max-h-[250px] min-h-[150px]',
          shouldCloseOnClick: false,
          placement: 'auto-end',
        }}
      >
        <DropDown.SearchBar query={query} onChange={setQuery} placeholder='Search...' />
        {results?.map((e) => (
          <DropDown.Option key={e} onClick={() => setValue(e)} isCurrent={e === value}>
            {e}
          </DropDown.Option>
        ))}
        {results?.length === 0 && <p className='mt-10 text-center font-medium text-text-tertiary'>No results found</p>}
      </DropDown>
    </div>
  );
}

function Offers() {
  const { offers } = useVisibleOffers();

  return (
    <div className='flex h-screen flex-shrink-0 gap-6 overflow-hidden p-8'>
      <Filters
        onFilter={(f) => console.log(f)}
        getLength={(filter, field) =>
          offers?.filter((o) =>
            typeof filter.value === 'object' ? filter.value.condition(o) : filter.value === o[field]
          ).length
        }
      />
      <OffersList hideFilter={true} onHomePage={true} />
    </div>
  );
}

function Filters({ getLength }) {
  const { filters, onFilter, filterCondition, appliedFiltersNumber, onChangeFilterCondition } = useOperations();

  return (
    <div className='flex h-full min-w-[250px] flex-col gap-3 overflow-hidden pt-2'>
      <div className='flex items-center justify-between border-b-2 border-border pb-2'>
        <h3 className='text-lg font-semibold text-text-primary'>Advanced Filter</h3>
        <div className='flex items-center gap-1.5'>
          <Button size='small' shape='icon' onClick={() => onFilter(null, true)} disabled={appliedFiltersNumber === 0}>
            <GrPowerReset />
          </Button>
          {Object.keys(filters).length > 1 && (
            <ToolTip content={`Toggle filter condition (currently ${filterCondition})`}>
              <Button size='small' shape='icon' onClick={onChangeFilterCondition}>
                {filterCondition === 'OR' ? <GoLink /> : <GoUnlink />}
              </Button>
            </ToolTip>
          )}
        </div>
      </div>
      <div className='flex flex-1 flex-col gap-3 divide-y divide-border overflow-auto pr-3'>
        {Object.keys(filters).map((key) => (
          <div className='flex flex-col gap-2 pt-2' key={key}>
            <h4 className='font-medium capitalize text-text-tertiary'>{key.replace(/([A-Z])/g, ' $1')}</h4>
            {filters[key]?.map(({ value, checked }) => (
              <ul className='space-y-4' key={value?.value || value}>
                <li className='flex items-center gap-3 text-sm'>
                  <CheckBox
                    checked={checked}
                    onChange={() => onFilter({ [key]: toggleChecked(filters[key], value) })}
                  />
                  <span className='flex-1 font-medium text-text-secondary'>{value?.value || value}</span>
                  <span className='count text-xs'>{getLength({ value, checked }, key)}</span>
                </li>
              </ul>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
