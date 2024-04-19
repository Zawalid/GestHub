import { Button } from '.';

export function ErrorScreen({ error }) {
  return (
    <div className='flex h-screen w-full max-w-screen-xl items-center justify-center  bg-background-primary px-4 md:px-8'>
      <div className='max-w-xl space-y-5 text-center'>
        <h3 className='font-semibold text-red-500'>Unexpected Error</h3>
        <p className='text-4xl font-semibold text-text-primary sm:text-5xl'>Oops !! Something went wrong</p>
        <p className='text-text-secondary'>
          Oops! Something unexpected happened. We&apos;re working on getting it fixed. <span className='font-bold text-text-primary'>Thanks</span> for your patience!{' '}
        </p>
        <Button className='mx-auto' onClick={() => location.reload()}>
          Try Again
        </Button>
        <p>{error?.message}</p>
      </div>
    </div>
  );
}
