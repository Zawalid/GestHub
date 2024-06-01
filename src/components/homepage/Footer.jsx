export function Footer() {
  return (
    <footer className='mt-auto w-full border-t border-border bg-background-disabled px-3 py-4'>
      <p className='text-center text-xs font-light text-text-primary'>
        &copy; {new Date().getFullYear()} | Developed by{' '}
        <a
          href='/team'
          target='_blank'
          rel='noopener noreferrer'
          className='font-semibold text-primary transition-colors duration-300 hover:text-primary-hover'
        >
       WH | BR
        </a>
       {' '}
         | All rights reserved
      </p>
    </footer>
  );
}
