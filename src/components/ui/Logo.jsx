import { Link } from 'react-router-dom';

export function Logo({ to = '/', className }) {
  if (to)
    return (
      <Link to={to} className={className}>
        <img src='/SVG/logo.svg' alt='Logo' />
      </Link>
    );
  return <img src='/SVG/logo.svg' alt='Logo' className={className} />;
}
