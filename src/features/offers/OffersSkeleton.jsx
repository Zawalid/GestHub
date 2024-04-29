export default function OffersSkeleton({ layout }) {
  return (
    <div
      className={`pr-2 w-full animate-pulse gap-5 ${
        layout === 'grid' ? 'grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))]' : 'flex flex-col'
      }`}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Offer key={i} />
      ))}
    </div>
  );
}

function Offer() {
  return (
    <div className='flex h-[250px] flex-col gap-5 rounded-lg border border-border bg-background-disabled p-5 shadow-md'>
      <div className='flex items-center justify-between'>
        <div className='h-4 w-36 rounded-md bg-background-secondary'></div>
        <div className='h-4 w-24 rounded-md bg-background-secondary'></div>
      </div>
      <div className='space-y-3'>
        <div className='h-2 w-5 rounded-md bg-background-secondary'></div>
        <div className='h-3 w-5/6 rounded-md bg-background-tertiary'></div>
        <div className='space-y-1'>
          <div className='h-2 w-full rounded-md bg-background-tertiary'></div>
          <div className='h-2 w-11/12 rounded-md bg-background-tertiary'></div>
          <div className='h-2 w-5/6 rounded-md bg-background-tertiary'></div>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <div className='h-4 w-14 rounded-md bg-background-secondary'></div>
        <div className='h-4 w-14 rounded-md bg-background-secondary'></div>
      </div>
      <div className='flex items-center gap-3 border-t pt-3 border-border'>
      <div className='h-4 w-24 rounded-md bg-background-tertiary'></div>
      <div className='h-4 w-12 rounded-md bg-background-tertiary'></div>
      <div className='h-4 w-16 rounded-md bg-background-tertiary'></div>
      <div className='h-4 w-20 rounded-md bg-background-tertiary'></div>
      </div>
    </div>
  );
}

export function OfferSkeleton() {
  return (
    <div className='mb-5 w-full animate-pulse overflow-auto'>
      <div className='mb-3 h-3 w-60 rounded-lg bg-background-tertiary'></div>
      <div className='space-y-1.5'>
        <div className='h-2 rounded-lg bg-background-secondary'></div>
        <div className='h-2 rounded-lg bg-background-secondary'></div>
        <div className='h-2 w-5/6 rounded-lg bg-background-secondary'></div>
        <div className='h-2 rounded-lg bg-background-secondary'></div>
        <div className='h-2 rounded-lg bg-background-secondary'></div>
        <div className='h-2 w-11/12 rounded-lg bg-background-secondary'></div>
        <div className='h-2 w-1/2 rounded-lg bg-background-secondary'></div>
      </div>
      <div className='mt-5 space-y-3 border-t border-border pt-2'>
        <div className='mb-4 h-2.5 w-32 rounded-lg bg-background-tertiary'></div>
        <div className='flex items-center gap-5'>
          <div className='h-2 w-20 rounded-lg bg-background-tertiary'></div>
          <div className='h-4 w-12 rounded-md bg-background-secondary'></div>
        </div>
        <div className='flex items-center gap-5'>
          <div className='h-2 w-16 rounded-lg bg-background-tertiary'></div>
          <div className='h-4 w-16 rounded-md bg-background-secondary'></div>
        </div>
        <div className='flex items-center gap-5'>
          <div className='h-2 w-16 rounded-lg bg-background-tertiary'></div>
          <div className='h-4 w-16 rounded-md bg-background-secondary'></div>
        </div>
        <div className='flex items-center gap-5'>
          <div className='h-2 w-16 rounded-lg bg-background-tertiary'></div>
          <div className='h-4 w-16 rounded-md bg-background-secondary'></div>
        </div>
        <div className='flex items-center gap-5'>
          <div className='h-2 w-16 rounded-lg bg-background-tertiary'></div>
          <div className='h-4 w-16 rounded-md bg-background-secondary'></div>
        </div>
        <div className='flex items-center gap-5'>
          <div className='h-2 w-10 rounded-lg bg-background-tertiary'></div>
          <div className='flex gap-3'>
            <div className='h-4 w-12 rounded-md bg-background-tertiary'></div>
            <div className='h-4 w-12 rounded-md bg-background-tertiary'></div>
            <div className='h-4 w-12 rounded-md bg-background-tertiary'></div>
            <div className='h-4 w-12 rounded-md bg-background-tertiary'></div>
            <div className='h-4 w-12 rounded-md bg-background-tertiary'></div>
            <div className='h-4 w-12 rounded-md bg-background-tertiary'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
