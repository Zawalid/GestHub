import { Modal } from '@/components/ui';
import { useOffer } from './useOffers';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { MdOutlineLocationOn } from 'react-icons/md';
import { formatDate } from '@/utils/helpers';

export default function OfferOverview() {
  const { offer, isLoading } = useOffer(1);

  const { title, description, duration, city,publicationDate, direction, sector, type, experience, isUrgent, skills } = offer || {};

  return (
    <Modal
      isOpen={location.pathname === '/app/offers'}
      // onClose={onClose}
      className='p-5 md:h-fit md:w-[600px] md:border'
      closeOnBlur={true}
    >
      <h2 className='text-xl font-bold'>{title}</h2>
      <span className='text-xs font-medium text-secondary'>{sector}</span>
      <p className='text-xs text-text-secondary sm:text-sm'>{description || 'No description'}</p>
      <div className='mt-2 flex items-center gap-1'>
        <span className='rounded-md bg-background-secondary px-2 py-1 text-center text-xs font-medium text-text-secondary'>
          {experience}
        </span>
        <span className='h-1 w-1 rounded-full bg-text-secondary'></span>
        <span className='rounded-md bg-background-secondary px-2 py-1 text-center text-xs font-medium text-text-secondary'>
          {type}
        </span>
      </div>
      <div className='flex flex-wrap items-center gap-3 border-t border-border pt-2 '>
        {skills?.map((skill) => (
          <span
            key={skill}
            className='rounded-md border border-border px-2 py-1 text-center text-xs font-medium text-text-secondary'
          >
            {skill}
          </span>
        ))}
      </div>
      <div className='flex flex-col justify-between gap-2 xs:flex-row xs:items-center'>
      <div className='flex w-fit items-center gap-2 rounded-md bg-background-tertiary px-2 py-1 text-center  font-medium text-text-secondary'>
        <IoCalendarNumberOutline />
        <div className='divide-x divide-text-secondary text-xs'>
          <span className='mr-1.5'>{formatDate(publicationDate)}</span>
          <span className='pl-1.5'>
            {duration < 12 ? `${duration} months` : duration === 12 ? '1 year' : `1 year and ${duration - 12} months`}
          </span>
        </div>
      </div>
      <div className='flex w-fit items-center gap-2 rounded-md bg-background-tertiary px-2 py-1 text-center  font-medium text-text-secondary'>
        <MdOutlineLocationOn />
        <div className='divide-x divide-text-secondary text-xs'>
          <span className='mr-1.5'>{direction}</span>
          <span className='pl-1.5'>{city}</span>
        </div>
      </div>
    </div>
    </Modal>
  );
}
