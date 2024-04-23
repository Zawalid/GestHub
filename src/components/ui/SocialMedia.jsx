import { GrYoutube, GrInstagram, GrTwitter, GrLinkedin, GrFacebookOption } from 'react-icons/gr';
import { Button } from './Button';
import { useState } from 'react';

const socials = [
  {
    href: 'https://www.facebook.com',
    icon: <GrFacebookOption />,
    color: '#1877f2',
  },
  {
    href: 'https://www.twitter.com',
    icon: <GrTwitter />,
    color: '#0a66c2',
  },
  {
    href: 'https://www.instagram.com',
    icon: <GrInstagram />,
    color: '#e1306c',
  },
  {
    href: 'https://www.linkedin.com',
    icon: <GrLinkedin />,
    color: '#1da1f2',
  },
  {
    href: 'https://www.youtube.com',
    icon: <GrYoutube />,
    color: '#ff0000',
  },
];
export function SocialMedia() {
  const [hovered, setHovered] = useState(null);

  return socials.map((s, index) => (
    <a
      href={s.href}
      key={s.href}
      className='group'
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
    >
      <Button
        shape='icon'
        className={`text-text-primary rounded-full group-hover:text-white`}
        style={{ backgroundColor: hovered === index ? s.color : 'transparent' }}
      >
        {s.icon}
      </Button>
    </a>
  ));
}
