export function Heading({ children, count }) {
  return (
    <h1 className='flex items-center gap-5 text-2xl sm:text-3xl font-bold text-text-primary'>
      {children}
      {count >= 0 && (
        <span className='text-xl rounded-lg border border-border px-2 py-1 font-semibold  text-text-primary sm:text-2xl '>
          {count}
        </span>
      )}
    </h1>
  );
}
