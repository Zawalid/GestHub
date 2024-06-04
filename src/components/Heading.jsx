import { useAutoAnimate } from '@formkit/auto-animate/react';

export function Heading({ children, count }) {
  const [parent] = useAutoAnimate();

  return (
    <h1 className='flex items-center gap-5 text-2xl font-bold text-text-primary sm:text-3xl' ref={parent}>
      {children}
      {count > 0 && <span className='count px-2.5 text-xl'>{count}</span>}
    </h1>
  );
}
