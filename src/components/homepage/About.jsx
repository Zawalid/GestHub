import { useState } from 'react';
import { IoIosArrowDown, IoIosMail } from 'react-icons/io';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoLocationSharp } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@/hooks/useUser';
import axios from 'axios';

export default function About() {
  const { settings } = useSettings();
  const { t } = useTranslation();

  return (
    <div className='relative grid grid-cols-1 gap-3 p-2 py-24 md:px-10'>
      <div>
        <h1 className='p-3 text-center text-5xl font-bold text-primary dark:text-text-primary'> {t('about.title')}</h1>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <DsiSummary />
        <div className='flex flex-1 flex-col gap-3'>
          {settings?.phone && (
            <div className='flex items-center  gap-4 rounded-lg border border-border bg-background-secondary p-4'>
              <div className='grid h-8 w-8 place-content-center rounded-full bg-secondary text-white'>
                <BsTelephoneFill />
              </div>
              <div className='space-y-2'>
                <h2 className=' font-bold text-primary'> {t('about.phone')}</h2>
                <a href='tel:+212537889900' className='text-sm font-medium text-text-secondary '>
                  {settings?.phone}
                </a>
              </div>
            </div>
          )}
          {settings?.email && (
            <div className='flex items-center  gap-4 rounded-lg border border-border bg-background-secondary p-4'>
              <div className='grid h-8 w-8 place-content-center rounded-full bg-secondary text-white  '>
                <IoIosMail />
              </div>
              <div className='space-y-2'>
                <h2 className=' font-bold text-primary'>{t('about.email')}</h2>
                <a href='mailto:stagiaire@men.gov.ma' className='text-sm font-medium text-text-secondary '>
                 {settings?.email}
                </a>
              </div>
            </div>
          )}
          <Location />
        </div>
      </div>
    </div>
  );
}

function DsiSummary() {
  return (
    <div className='space-y-3 rounded-lg border border-border bg-background-secondary p-3'>
      <h1 className='py-3 text-center text-2xl font-bold text-secondary'>La Direction du système d&apos;information</h1>
      <div>
        <h3 className='mb-3 font-semibold text-text-primary'>
          La Direction du système d&apos;information a pour missions de:
        </h3>
        <ul className='space-y-0.5 px-2'>
          <li className='text-text-tertiary'>
            - Concevoir, mettre en place et suivre le système d&apos;information statistique du Ministère
          </li>
          <li className='text-text-tertiary'>- Réaliser des études à caractère organisationnel</li>
          <li className='text-text-tertiary'>
            - Contribuer à l&apos;élaboration du schéma directeur informatique du Ministère et des académies régionales
            d&apos;éducation et de formation.
          </li>
        </ul>
      </div>
      <div>
        <h3 className='mb-3 font-semibold text-text-primary'>
          La Direction du système d&apos;information est composée de:
        </h3>
        <ul className='space-y-0.5 px-2'>
          <h4 className='text-text-secondary'>1) Division de la stratégie informatique</h4>
          <div className='pl-4'>
            <li className='text-text-tertiary'>- Service des études informatiques</li>
            <li className='text-text-tertiary'>- Service de pilotage des schémas directeurs informatiques</li>
          </div>
        </ul>
        <ul className='space-y-0.5 px-2'>
          <h4 className='text-text-secondary'>2) Centre informatique</h4>
          <div className='pl-4'>
            <li className='text-text-tertiary'>
              - Service de l&apos;administration de la banque de données statistiques
            </li>
            <li className='text-text-tertiary'>
              - Service de la gestion de la logistique informatique et de l&apos;administration des réseaux
            </li>
            <li className='text-text-tertiary'>
              - Le Centre informatique a rang de division de l&apos;administration centrale.
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}

function Location() {
  const [isOpen, setIsOpen] = useState(true);
  const { settings } = useSettings();
  const { t } = useTranslation();

  if (!settings?.location) return null;

  return (
    <div
      className='flex cursor-pointer flex-col rounded-lg border border-border bg-background-secondary p-4 hover:bg-background-tertiary'
      onClick={() => setIsOpen((e) => !e)}
    >
      {settings?.location && (
        <div className='flex items-center justify-between  gap-4 '>
          <div className='grid h-8 w-8 place-content-center rounded-full bg-secondary text-white'>
            <IoLocationSharp />
          </div>
          <div className={`flex-1  ${isOpen && 'pb-3'}  `}>
            <h2 className=' font-bold text-primary'> {t('about.location')}</h2>
            <a
              href='https://maps.app.goo.gl/miz9LAa9i2FCbZNa7'
              target='_blank'
              rel='noreferrer'
              className='text-sm font-medium text-text-secondary '
            >
             {settings?.location}
            </a>
          </div>
          <button className={`text-text-primary transition-transform duration-500 ${isOpen && 'rotate-180'} `}>
            <IoIosArrowDown />
          </button>
        </div>
      )}
      <div
        className='h-0 overflow-hidden rounded-lg border border-border transition-[height] duration-500'
        style={{
          height: isOpen ? '300px' : '0px',
          border: !isOpen && 'none',
        }}
      >
        <iframe
          src={settings?.maps}
          allowFullScreen=''
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          width='100%'
          height='300'
        ></iframe>
      </div>
    </div>
  );
}

