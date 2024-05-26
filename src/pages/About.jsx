import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { IoMail, BsTelephoneFill, IoLocationSharp, IoMapOutline } from '@/components/ui/Icons';
import { useSettings } from '@/hooks/useUser';
import { changeTitle } from '@/utils/helpers';

export function About() {
  useEffect(() => {
    changeTitle('About Us');
  }, []);

  return (
    <div className='flex gap-5 p-5 '>
      <Text />
      <Details />
    </div>
  );
}

function Text() {
  const { settings, isLoading } = useSettings();

  return (
    <div className='about space-y-3 rounded-lg border border-border bg-background-secondary p-3 w-full'>
      {isLoading && (
        <div className='animate-puls space-y-4 p-3'>
          <div className='mx-auto mb-8 h-5 w-1/2 rounded-lg bg-background-tertiary'></div>
          <div className='space-y-2'>
            <div className='h-3 w-3/4 rounded bg-background-tertiary'></div>
            <div className='h-3 w-1/2 rounded bg-background-tertiary'></div>
            <div className='h-3 w-2/3 rounded bg-background-tertiary'></div>
          </div>
          <div className='h-4 w-1/2 rounded bg-background-tertiary'></div>
          <div className='space-y-2'>
            <div className='h-3 w-1/3 rounded bg-background-tertiary'></div>
            <div className='h-3 w-1/2 rounded bg-background-tertiary'></div>
            <div className='h-3 w-1/3 rounded bg-background-tertiary'></div>
            <div className='h-3 w-2/3 rounded bg-background-tertiary'></div>
          </div>
          <div className='h-4 w-1/2 rounded bg-background-tertiary'></div>
          <div className='space-y-2'>
            <div className='h-3 w-3/4 rounded bg-background-tertiary'></div>
            <div className='h-3 w-1/2 rounded bg-background-tertiary'></div>
            <div className='h-3 w-2/3 rounded bg-background-tertiary'></div>
          </div>
          <div className='h-4 w-1/2 rounded bg-background-tertiary'></div>
          <div className='space-y-2'>
            <div className='h-3 w-1/3 rounded bg-background-tertiary'></div>
            <div className='h-3 w-1/3 rounded bg-background-tertiary'></div>
            <div className='h-3 w-1/2 rounded bg-background-tertiary'></div>
            <div className='h-3 w-2/3 rounded bg-background-tertiary'></div>
          </div>
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(settings?.aboutDescription) }} />
    </div>
  );
}

function Details() {
  const { settings, isLoading } = useSettings();

  if (!settings?.phone && !settings?.email && !settings?.location) return null;

  return (
    <div className='flex min-w-[400px] flex-1 flex-col gap-3'>
      <Info label='about.phone' isLoading={isLoading} value={settings?.phone} icon={<BsTelephoneFill />} />
      <Info label='about.email' isLoading={isLoading} value={settings?.email} icon={<IoMail />} />
      <div className='flex flex-1 flex-col rounded-lg border border-border bg-background-secondary'>
        <Info label='about.location' isLoading={isLoading} value={settings?.location} icon={<IoLocationSharp />} />
        {isLoading && (
          <div className='animate-puls grid flex-1 place-content-center text-4xl text-background-tertiary'>
            <IoMapOutline />
          </div>
        )}
        {settings?.location && (
          <div className='flex-1 overflow-hidden rounded-b-lg'>
            <iframe
              src={settings?.maps}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              width='100%'
              height='100%'
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

const Info = ({ isLoading, value, label, icon }) => {
  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className='animate-puls flex items-center gap-4 rounded-lg border border-border bg-background-secondary p-4'>
        <div className='h-10 w-10 rounded-full bg-background-tertiary'></div>
        <div className='flex-1 space-y-1.5'>
          <div className='h-2.5 w-1/2 bg-background-tertiary'></div>
          <div className='h-4 w-3/4 bg-background-tertiary'></div>
        </div>
      </div>
    );
  if (!value) return null;

  return (
    <div
      className='flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-background-secondary p-4 transition-colors duration-300 hover:bg-background-tertiary'
      onClick={() => navigator.clipboard.writeText(value).then(() => toast.success(`${t(label)} copied successfully`))}
    >
      <div className='grid h-9 w-9 place-content-center rounded-full bg-secondary text-white'>{icon}</div>
      <div className='space-y-1'>
        <h3 className='text-xs font-medium text-text-secondary'> {t(label)}</h3>
        <h2 className='font-bold text-sm text-text-primary '>{value}</h2>
      </div>
    </div>
  );
};
