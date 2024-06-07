import { formatDate } from '@/utils/helpers';
import {
  BsClipboard2Check,
  IoCalendarNumberOutline,
  IoEyeOffOutline,
  MdOutlineLocationOn,
} from '@/components/ui/Icons';
import { useUser } from '@/hooks/useUser';
import { useNavigateWithQuery } from '@/hooks/useNavigateWithQuery';

export default function Offer({ offer, layout }) {
  const { user } = useUser();
  const {
    id,
    title,
    description,
    sector,
    experience,
    skills,
    publicationDate,
    duration,
    company,
    city,
    visibility,
    status,
    type,
    isFavorite,
  } = offer;
  const navigate = useNavigateWithQuery();

  return (
    <div
      className={`group relative flex w-full cursor-pointer flex-col gap-3 rounded-lg  border border-border bg-background-disabled p-3 shadow-md transition-transform duration-300 hover:scale-95 ${status === 'Urgent' ? 'rounded-tl-none' : ''} ${isFavorite ? 'rounded-tr-none' : ''} ${layout === 'list' ? 'h-fit' : ''}`}
      onClick={() => navigate(`/${window.location.pathname.includes('/app') ? 'app/offers/' : ''}${id}`)}
    >
      <Indicator condition={status === 'Urgent'} className='-left-[1.5px] bg-red-500' />
      <Indicator condition={isFavorite && (user?.role === 'user' || !user)} className='-right-[1.5px] bg-yellow-500' />

      <Layer condition={visibility === 'Hidden'} icon={<IoEyeOffOutline />} />
      <Layer condition={user?.applications?.find((d) => d.offer_id === +id)} icon={<BsClipboard2Check />} />

      <DateLocation {...{ publicationDate, duration, company, city }} />

      <div>
        <span className='text-xs font-medium text-secondary'>{sector}</span>
        <h3 className='line-clamp-2 text-lg font-semibold text-text-primary'>{title}</h3>
        <p className='line-clamp-2 text-xs text-text-secondary sm:text-sm'>{description || 'No description'}</p>
        <div className='mt-2 flex items-center gap-1'>
          <span className='rounded-md bg-background-secondary px-2 py-1 text-center text-xs font-medium text-text-secondary'>
            {experience}
          </span>
          <span className='h-1 w-1 rounded-full bg-text-secondary'></span>
          <span className='rounded-md bg-background-secondary px-2 py-1 text-center text-xs font-medium text-text-secondary'>
            {type}
          </span>
        </div>
      </div>
      <Skills skills={skills} />
    </div>
  );
}

export function Layer({ condition, icon }) {
  return (
    condition && (
      <div className='absolute left-0 top-0 grid h-full w-full place-content-center overflow-hidden rounded-lg transition-opacity duration-300 group-hover:opacity-0'>
        <div className='absolute h-full w-full bg-background-primary opacity-60'></div>
        <span className='z-10 text-3xl text-text-secondary'>{icon}</span>
      </div>
    )
  );
}

function Indicator({ condition, className }) {
  return (
    condition && (
      <>
        <span className={`absolute -top-[1.5px] h-[2px] w-16 rounded-lg ${className}`}></span>
        <span className={`absolute -top-[1.5px] h-16 w-[2px] rounded-lg ${className}`}></span>
      </>
    )
  );
}

function DateLocation({ publicationDate, duration, city, company }) {
  return (
    <div className='flex flex-wrap items-center justify-between  gap-2'>
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
          <span className='mr-1.5'>{company}</span>
          <span className='pl-1.5'>{city}</span>
        </div>
      </div>
    </div>
  );
}

function Skills({ skills }) {
  if (!skills || !skills.length)
    return (
      <span className='w-fit rounded-md border border-border px-2 py-1 text-center text-[10px] font-medium text-text-secondary'>
        No skills required
      </span>
    );
  return (
    <div className='flex flex-wrap items-center gap-3 border-t border-border pt-2 '>
      {skills.slice(0, 3).map((skill) => (
        <span
          key={skill}
          className='rounded-md border border-border px-2 py-1 text-center text-[10px] font-medium text-text-secondary'
        >
          {skill}
        </span>
      ))}
      {skills.slice(3).length > 0 && (
        <span className='rounded-md border border-border px-2 py-1 text-center text-xs font-medium text-text-secondary'>
          + {skills.slice(3).length} skills
        </span>
      )}
    </div>
  );
}
