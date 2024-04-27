import { Link } from 'react-router-dom';

export function Logo({ to = '/', className }) {
  return (
    <Link to={to} className={className}>
      <img src='/images/logo-MEN.png' alt='Logo' />
    </Link>
  );
}
