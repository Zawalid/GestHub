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

const Loading = ({ size = 'default' }) => {
  const sizes = {
    default: 'w-16',
    small: 'w-10',
  };
  return (
    <div
      className={`flex aspect-square animate-spin  items-center justify-center rounded-full border-t-4 border-primary text-yellow-700 ${sizes[size]}`}
    ></div>
  );
};

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

export function Status({ status, heading, message, size }) {
  const props = { heading, message, size };

  const statuses = {
    noResults: <NoResults {...props} />,
    error: <Error {...props} />,
    loading: <Loading size={size} />,
    locked: <Locked {...props} />,
  };

  return (
    <div className='absolute top-0 z-[2] flex h-full w-full flex-col items-center justify-center text-center'>
      {statuses[status]}
    </div>
  );
}
