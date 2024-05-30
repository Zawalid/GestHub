import { useTranslation } from 'react-i18next';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { IoBriefcaseOutline, IoChevronDownOutline, IoLocationOutline, IoSearchOutline } from '@/components/ui/Icons';
import { Button, DropDown } from '../ui';
import { useVisibleOffers } from '@/features/offers/useOffers';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Hero() {
  const [parent] = useAutoAnimate({ duration: 300 });
  const { t } = useTranslation();

  // return (
  //   <div
  //     ref={parent}
  //     className="relative grid grid-cols-1 min-h-[75vh] max-lg:text-center lg:grid-cols-2 pt-10 lg:px-12 2xl:px-24 bg-background-primary"
  //   >
  //     <div className="flex my-auto flex-col pb-10 mb-10">
  //       <div className="p-4 mb-10">
  //         <h1 className="text-3xl sm:text-4xl lg:text-5xl text-text-primary mb-6 leading-[65px]">
  //           {t("hero.title1")}{" "}
  //           <span className=" font-extrabold text-secondary">
  //             {" "}
  //             {t("hero.title2")}{" "}
  //           </span>{" "}
  //           {t("hero.title3")}
  //         </h1>
  //         <p className="text-text-secondary">{t("hero.paragraph")}</p>
  //       </div>
  //       <div className=" p-4"></div>
  //     </div>
  //     <div className="hidden lg:flex self-end justify-center items-center">
  //       <img src="SVG/hero.svg" className=" w-3/4" alt="" />
  //     </div>

  //   </div>
  // );

  return (
    <div className='h-[400px] p-8'>
      <div className='relative h-full rounded-lg bg-background-secondary'>
        <img src='/SVG/hero-1.svg' alt='' className='absolute bottom-4 left-4 w-52 opacity-60' />
        <img src='/SVG/hero-1.svg' alt='' className='absolute right-4 top-2 w-52 opacity-60' />
        <div className='flex h-full w-full flex-col justify-center gap-8 bg-white/20 p-8 backdrop-blur-[1px] dark:bg-black/20 '>
          <div className='space-y-2 text-center'>
            <h1 className='text-2xl font-medium text-text-primary sm:text-3xl '>
              {t('hero.title1')} <span className=' font-extrabold text-secondary'> {t('hero.title2')} </span>{' '}
              {t('hero.title3')}
            </h1>
            <p className='text-sm font-medium text-text-secondary'>{t('hero.paragraph')}</p>
          </div>
          <Search />
        </div>
      </div>
    </div>
  );
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sector, setSector] = useState(searchParams.get('sector') || 'Sector');
  const [location, setLocation] = useState(searchParams.get('location') || 'Location');
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  return (
    <div className='flex gap-5 self-center rounded-xl bg-background-primary p-4 shadow-md'>
      <Filter icon={<IoBriefcaseOutline />} value={sector} setValue={setSector} field='sector' />
      <span className='h-full w-0.5 bg-border'></span>
      <Filter icon={<IoLocationOutline />} value={location} setValue={setLocation} field='city' />
      <span className='h-full w-0.5 bg-border'></span>

      <div className='flex items-center gap-2'>
        <IoSearchOutline />
        <input
          type='search'
          className='border-b border-border bg-transparent pb-0.5 text-sm font-medium text-text-tertiary outline-none'
          placeholder='Your keyword...'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <Button
        className='ml-10'
        disabled={sector === 'Sector' && location === 'Location' && !keyword}
        onClick={() =>
          setSearchParams({
            sector,
            location,
            keyword,
          })
        }
      >
        Search
      </Button>
    </div>
  );
}

function Filter({ icon, value, setValue, field }) {
  const { offers } = useVisibleOffers();
  const [query, setQuery] = useState('');

  const results = [...new Set(offers?.map((offer) => offer[field]))].filter((e) => e.includes(query));

  return (
    <div className='flex items-center gap-2 text-text-tertiary'>
      <DropDown
        toggler={
          <Button display='with-icon' color='tertiary' className='bg-transparent'>
            {icon}
            <span className='text-sm font-medium'>{value}</span>
            <IoChevronDownOutline />
          </Button>
        }
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
