export function Heading({ children, count }) {
  return (
    <h1 className='flex items-center gap-5 text-2xl font-bold text-text-primary sm:text-3xl'>
      {children}
      {count >= 0 && <span className='count text-xl px-2.5'>{count}</span>}
    </h1>
  );
}
