import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Button, ToolTip } from '.';
import { changeTitle } from '@/utils/helpers';
import { PiStackSimpleFill, PiStackFill } from 'react-icons/pi';
import { FaCopy } from 'react-icons/fa6';

export function ErrorScreen({ error }) {
  const [control, setControl] = useState({ isDeveloper: false, showDetails: false });

  useEffect(() => {
    changeTitle('Something Went Wrong');
  }, []);

  return (
    <>
      <div className='flex h-screen w-full max-w-screen-xl items-center justify-center bg-background-primary px-4 md:px-8'>
        <div className='max-w-xl space-y-5 text-center'>
          <h3 className='font-semibold text-red-500'>Unexpected Error</h3>
          <p className='text-4xl font-semibold text-text-primary sm:text-5xl'>Oops !! Something went wrong</p>
          <p className='text-text-secondary'>
            Oops! Something unexpected happened. We&apos;re working on getting it fixed.{' '}
            <span className='font-bold text-text-primary'>Thanks</span> for your patience!
          </p>
          <div className='flex justify-center gap-3'>
            <Button onClick={() => location.reload()}>Try Again</Button>
            <Button
              color='tertiary'
              onClick={() => setControl((prev) => ({ ...prev, isDeveloper: !prev.isDeveloper }))}
            >
              {control.isDeveloper ? "I'm a User" : "I'm a Developer"}
            </Button>
          </div>

          {control.isDeveloper && (
            <div className='relative mt-4 max-h-[200px] overflow-auto rounded-lg border border-border bg-background-secondary p-3 text-sm text-text-secondary'>
              <div className='absolute right-2 top-2 flex'>
                <ToolTip content={control.showDetails ? 'Hide Details' : 'Show Details'}>
                  <Button
                    shape='icon'
                    size='small'
                    onClick={() => setControl((prev) => ({ ...prev, showDetails: !prev.showDetails }))}
                  >
                    {control.showDetails ? <PiStackSimpleFill /> : <PiStackFill />}
                  </Button>
                </ToolTip>
                <ToolTip content='Copy Error'>
                  <Button
                    shape='icon'
                    size='small'
                    onClick={() => {
                      if (control.showDetails)
                        navigator.clipboard.writeText(JSON.stringify(serializeError(error), null, 2));
                      else navigator.clipboard.writeText(error?.message);
                      toast.success('Error copied to clipboard');
                    }}
                  >
                    <FaCopy />
                  </Button>
                </ToolTip>
              </div>
              {control.showDetails ? (
                <pre className='text-wrap p-4'>{JSON.stringify(serializeError(error), null, 2)}</pre>
              ) : (
                <p className='p-4 font-bold'>{`"${error?.message}"`}</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Toaster
        position={JSON.parse(localStorage.getItem('local_settings'))?.toastPosition || 'bottom-right'}
        theme={localStorage.getItem('theme') || 'dark'}
        toastOptions={{ className: 'sonner-toast', duration: 2000 }}
      />
    </>
  );
}

function serializeError(error) {
  if (error instanceof Error) {
    // Extracting only serializable properties
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  // Fallback for non-Error objects or plain objects
  return error;
}
