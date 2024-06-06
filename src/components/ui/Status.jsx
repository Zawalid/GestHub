import { HiMiniXMark, FiCheck, BsSendFill } from '@/components/ui/Icons';
import { Button } from '.';

const NoResults = ({ heading, message, size }) => {
  return (
    <>
      <img src='/images/no_result.png' alt='no results' className={size === 'small' ? 'w-[150px]' : 'w-[200px]'} />
      <div className='space-y-2'>
        <h3 className={`font-semibold text-text-secondary ${size === 'small' ? 'text-sm' : 'text-lg'}`}>
          {heading || 'No results found'}
        </h3>
        {message && <p className={`text-text-tertiary ${size === 'small' ? 'text-xs' : 'text-sm'}`}>{message}</p>}
      </div>
    </>
  );
};

const Error = ({ heading, message, size }) => {
  return (
    <>
      <img src='/images/error.png' alt='no results' className={size === 'small' ? 'w-10' : 'w-14'} />
      <div className='mt-3 space-y-2'>
        <h3 className={`font-semibold text-red-500 ${size === 'small' ? 'text-sm' : 'text-lg'}`}>
          {heading || 'Something went wrong! Please try again.'}
        </h3>
        {message && <p className={`text-red-400 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>{message}</p>}
      </div>
    </>
  );
};

const Loading = () => <div className='loading'></div>;

const Locked = ({ heading, message }) => {
  return (
    <>
      <img src='/images/locked.png' alt='no results' className='w-20' />
      <div className='mt-3 space-y-2'>
        <h3
          className='text-lg font-semibold text-text-primary
        '
        >
          {heading || 'Access Denied'}
        </h3>
        {message && <p className='text-sm text-text-secondary'>{message}</p>}
      </div>
    </>
  );
};

const PageNotFound = () => {
  return (
    <div className='absolute grid h-full w-full place-content-center place-items-center gap-5 pt-5'>
      <img src='/SVG/no-applications.svg' alt='' className='w-[100px]' />
      <div className='space-y-2 text-center'>
        <h2 className='font-medium text-text-primary'> Page Not Found</h2>
        <p className='text-sm text-text-secondary'>The page you&apos;re trying to access doesn&apos;t exist.</p>
      </div>
    </div>
  );
};

const Sending = ({ heading, message }) => {
  return (
    <div className='grid flex-1 place-content-center place-items-center text-center'>
      <div className='mb-3 grid h-14 w-14 place-content-center rounded-full bg-blue-500 shadow-md'>
        <BsSendFill className='text-2xl text-white' />
      </div>
      <div className='mb-1 flex items-baseline gap-1'>
        <h2 className='text-lg font-bold text-text-primary sm:text-xl'>{heading}</h2>
        <div className='sending'></div>
      </div>
      <p className='text-sm font-medium text-text-secondary'>{message}</p>
    </div>
  );
};

const Sent = ({ heading, message }) => {
  return (
    <div className='grid flex-1 place-content-center place-items-center text-center'>
      <div className='mb-3 grid h-14 w-14 place-content-center rounded-full bg-green-500 shadow-md'>
        <FiCheck className='text-3xl text-white' />
      </div>
      <h2 className='mb-1 text-lg font-bold text-text-primary sm:text-xl'>{heading}</h2>
      <p className='text-sm font-medium text-text-secondary'>{message}</p>
    </div>
  );
};

const ErrorSending = ({ heading, message, onRetry }) => {
  return (
    <div className='grid flex-1 place-content-center place-items-center text-center'>
      <div className='grid h-14 w-14 place-content-center rounded-full bg-red-500 shadow-md'>
        <HiMiniXMark className='text-3xl text-white' />
      </div>
      <div className='my-3'>
        <h2 className='mb-1 text-lg font-bold text-text-primary sm:text-xl'>{heading}</h2>
        <p className='text-sm font-medium text-text-secondary'>{message}</p>
      </div>
      <Button onClick={onRetry}>Try Again</Button>
    </div>
  );
};

export function Status({ status, heading, message, size, ...props }) {
  const prs = { heading, message, size, ...props };

  const statuses = {
    noResults: <NoResults {...prs} />,
    error: <Error {...prs} />,
    loading: <Loading size={size} />,
    locked: <Locked {...prs} />,
    pageNotFound: <PageNotFound />,
    sending: <Sending {...prs} />,
    sent: <Sent {...prs} />,
    errorSending: <ErrorSending {...prs} />,
  };

  return (
    <div className='absolute left-0 top-0 z-[2] flex h-full w-full flex-col items-center justify-center text-center'>
      {statuses[status]}
    </div>
  );
}
