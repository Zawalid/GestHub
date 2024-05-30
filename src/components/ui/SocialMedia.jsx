/* eslint-disable react-refresh/only-export-components */
import { GrYoutube, GrInstagram, GrTwitter, GrLinkedin, GrFacebookOption } from 'react-icons/gr';
import { Button } from './Button';
import { useState } from 'react';
import { useSettings } from '@/hooks/useUser';

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

export const isSet = (settings) => socials.map((s) => s.name.toLocaleLowerCase()).some((s) => settings?.[s]);

export function SocialMedia({ className = '', size }) {
  const [hovered, setHovered] = useState(null);
  const { settings } = useSettings();

  if (!isSet(settings)) return null;

  return (
    <div className={`relative flex items-center justify-center gap-3 shadow-md ${className}`}>
      {socials
        .filter((s) => settings?.[s.name.toLocaleLowerCase()])
        .map((s, index) => {
          const url = settings?.[s.name.toLocaleLowerCase()];
          const href = url?.startsWith('http://') || url?.startsWith('https://') ? url : 'http://' + url;

          return (
            <a
              key={s.href}
              href={href}
              target='_blank'
              className='group'
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <Button
                shape='icon'
                className={`rounded-full text-text-primary group-hover:text-white`}
                style={{ backgroundColor: hovered === index ? s.color : 'transparent' }}
                size={size}
              >
                {s.icon}
              </Button>
            </a>
          );
        })}
    </div>
  );
}
