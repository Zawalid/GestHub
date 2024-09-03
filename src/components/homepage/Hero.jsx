import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { IoBriefcaseOutline, IoChevronDownOutline, IoLocationOutline, IoSearchOutline } from '@/components/ui/Icons';
import { useOperations } from '../shared/Operations/useOperations';
import { Button, DropDown } from '../ui';
import { useCities, useSectors } from '@/features/offers/useOffers';

export default function Hero() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  return (
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
          <Search query={searchParams.get('search')} />
        </div>
      </div>
    </div>
  );
}

function Search({ query }) {
  const [sector, setSector] = useState('Sector');
  const [city, setCity] = useState('City');
  const [keyword, setKeyword] = useState(query || '');
  const { onFilter, onSearch } = useOperations();

  return (
    <div className='flex flex-col gap-3 rounded-xl bg-background-primary p-2 shadow-md sm:gap-5 sm:p-4 md:flex-row md:items-center md:self-center'>
      <FilterDropDown icon={<IoBriefcaseOutline />} value={sector} setValue={setSector} type='sectors' />
      <span className='hidden h-1/2 w-0.5 bg-border md:block'></span>
      <FilterDropDown icon={<IoLocationOutline />} value={city} setValue={setCity} type='cities' />
      <span className='hidden h-1/2 w-0.5 bg-border md:block'></span>

      <div className='flex items-center gap-2 p-3'>
        <IoSearchOutline className='text-lg' />
        <input
          type='search'
          className='w-full border-b border-border bg-transparent pb-1.5 text-sm font-medium text-text-primary outline-none placeholder:text-text-tertiary'
          placeholder='Your keyword...'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className='grid grid-cols-2 gap-1.5'>
        <Button
          disabled={sector === 'Sector' && city === 'City' && !keyword}
          onClick={() => {
            onSearch(keyword);
            sector !== 'Sector' && onFilter('sector', sector);
            city !== 'City' && onFilter('city', city);
            document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Search
        </Button>
        <Button
          color='tertiary'
          disabled={sector === 'Sector' && city === 'City' && !keyword}
          onClick={() => {
            setSector('Sector');
            setCity('City');
            setKeyword('');
            onSearch('');
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

function FilterDropDown({ icon, value, setValue, type }) {
  const { sectors, isLoading: isSectorsLoading } = useSectors();
  const { cities, isLoading: isCitiesLoading } = useCities();
  const [query, setQuery] = useState('');

  const results = { sectors, cities }[type]?.filter((e) => e.toLowerCase().includes(query.toLowerCase()));

  const render = () => {
    if ({ sectors: isSectorsLoading, cities: isCitiesLoading }[type]) {
      return <p className='mt-10 text-center font-medium text-text-tertiary'>Loading...</p>;
    }
    if (!results?.length) return <p className='mt-10 text-center font-medium text-text-tertiary'>No results found</p>;
    return results?.map((e) => (
      <DropDown.Option key={e} onClick={() => setValue(e)} isCurrent={e === value}>
        {e}
      </DropDown.Option>
    ));
  };

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
         {render()}
      </DropDown>
    </div>
  );
}
