export function Footer() {
  return (
    <footer className='mt-auto w-full border-t border-border px-3 py-4'>
      <p className='text-center text-xs font-light text-text-secondary'>
         Developed by{' '}
        <button className='font-semibold text-primary transition-colors duration-300 hover:text-primary-hover'>
          Walid & Hassan
        </button> | &copy; {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}
