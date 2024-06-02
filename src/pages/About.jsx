import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useSettings } from '@/hooks/useUser';
import { changeTitle } from '@/utils/helpers';

export function About() {
  const { settings, isLoading } = useSettings();

  useEffect(() => {
    changeTitle('About Us');
  }, []);

  return (
    <div className='about w-full space-y-3 px-5 py-8'>
      {isLoading && (
        <div className='animate-pulse space-y-4 p-3'>
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
