import { GrYoutube, GrInstagram, GrTwitter, GrLinkedin, GrFacebookOption } from 'react-icons/gr';
import { Button } from './Button';
import { useState } from 'react';
import { useSettings } from '@/hooks/useUser';

// eslint-disable-next-line react-refresh/only-export-components
export const socials = [
  {
    href: 'https://www.facebook.com',
    icon: <GrFacebookOption />,
    color: '#1877f2',
    name: 'Facebook',
  },
  {
    href: 'https://www.twitter.com',
    icon: <GrTwitter />,
    color: '#0a66c2',
    name: 'Twitter',
  },
  {
    href: 'https://www.instagram.com',
    icon: <GrInstagram />,
    color: '#e1306c',
    name: 'Instagram',
  },
  {
    href: 'https://www.linkedin.com',
    icon: <GrLinkedin />,
    color: '#1da1f2',
    name: 'Linkedin',
  },
  {
    href: 'https://www.youtube.com',
    icon: <GrYoutube />,
    color: '#ff0000',
    name: 'Youtube',
  },
];
export function SocialMedia() {
  const [hovered, setHovered] = useState(null);
  const { settings } = useSettings();

  if (!socials.map((s) => s.name.toLocaleLowerCase()).some((s) => settings?.[s])) return null;

  return (
    <footer className='relative mt-auto flex items-center justify-center gap-6  border-t  border-border px-5 py-2 shadow-md '>
      {socials
        .filter((s) => settings?.[s.name.toLocaleLowerCase()])
        .map((s, index) => (
          <a
            key={s.href}
            href={settings?.[s.name.toLocaleLowerCase()]}
            target='_blank'
            className='group'
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <Button
              shape='icon'
              className={`rounded-full text-text-primary group-hover:text-white`}
              style={{ backgroundColor: hovered === index ? s.color : 'transparent' }}
            >
              {s.icon}
            </Button>
          </a>
        ))}
    </footer>
  );
}
