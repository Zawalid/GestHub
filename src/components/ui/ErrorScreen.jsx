import { useState } from 'react';
import { Button } from '.';

export function ErrorScreen({ error }) {
  const [showDetails, setShowDetails] = useState(false);
  console.log(error);

  return (
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
          {/* Toggle Button */}
          <Button color='tertiary' onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>
        {/* Conditional rendering of error details */}
        {showDetails && (
          <div className='mt-4 overflow-auto max-h-[200px] rounded-lg border border-border bg-background-secondary text-sm text-text-secondary'>
            <p>Error Details:</p>
            <pre className='text-wrap'>{JSON.stringify(serializeError(error), null, 2)}</pre>{' '}
          </div>
        )}
        <p>{error?.message}</p>
      </div>
    </div>
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
