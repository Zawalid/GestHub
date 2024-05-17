import { useSettings } from '@/hooks/useUser';
import { Link } from 'react-router-dom';

export function Logo({ to = '/', className }) {
  const { settings } = useSettings();

  if (to)
    return (
      <Link to={to} className={className}>
        <img src={settings?.appLogo?.src || '/SVG/logo.svg'} alt='Logo' className='h-8' />
      </Link>
    );
  return <img src='/SVG/logo.svg' alt='Logo' className={className} />;
}
