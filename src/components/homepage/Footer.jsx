export function Footer() {
  return (
    <div className='px-3 mt-auto w-full border-t border-border py-4'>
      <p className='text-center text-xs font-light text-text-primary'>
        &copy; {new Date().getFullYear()} | Developed by{' '}
        <a
          href='https://github.com/Zawalid'
          target='_blank'
          rel='noopener noreferrer'
          className='font-semibold text-primary transition-colors duration-300 hover:text-primary-hover'
        >
          Walid Zakan
        </a>{' '}
        and{' '}
        <a
          href='https://github.com/ElhassaneMhd/'
          target='_blank'
          rel='noopener noreferrer'
          className='font-semibold text-primary transition-colors duration-300 hover:text-primary-hover'
        >
          Hassan Elmhdioui
        </a>
        | All rights reserved
      </p>
    </div>
  );
}
