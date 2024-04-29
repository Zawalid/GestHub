import { Link } from 'react-router-dom';

export function Logo({ to = '/', className }) {
  return (
    <Link to={to} className={className}>
      <img src='/SVG/logo.svg' alt='Logo' />
    </Link>
  );
}
